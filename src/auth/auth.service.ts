import { PrismaService } from 'nestjs-prisma';
import { Prisma, User } from '@prisma/client';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';
import { SignupInput } from './dto/signup.input';
import { Token } from './models/token.model';
import { SecurityConfig } from 'src/common/configs/config.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService
  ) {}

  async createUser(
    payload: { email: string; password: string },
    role = 'verifier'
  ): Promise<Token> {
    const roleMapToModel = {
      verifier: this.prisma.verifier,
      client: this.prisma.client,
      admin: this.prisma.admin,
    };

    const userModel = roleMapToModel[role];
    if (!userModel) throw new NotFoundException(`Role ${role} not found.`);
    const hashedPassword = await this.passwordService.hashPassword(
      payload.password
    );

    try {
      const user = await userModel.create({
        data: {
          email: payload.email,
          password: hashedPassword,
        },
      });

      return this.generateTokens({
        userId: user.id,
        role: role,
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException(`Email ${payload.email} already used.`);
      } else {
        throw new Error(e);
      }
    }
  }

  async login(
    email: string,
    password: string,
    role = 'verifier'
  ): Promise<Token> {
    console.log('role', role);
    const roleMapToModel = {
      verifier: this.prisma.verifier,
      client: this.prisma.client,
      admin: this.prisma.admin,
    };

    const userModel = roleMapToModel[role];
    if (!userModel) throw new NotFoundException(`Role ${role} not found.`);
    const user = await userModel.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const passwordValid = await this.passwordService.validatePassword(
      password,
      user.password
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    return this.generateTokens({
      userId: user.id,
      role,
    });
  }

  validateUser(userId: string, role: string): Promise<User> {
    const roleMapToModel = {
      verifier: this.prisma.verifier,
      client: this.prisma.client,
      admin: this.prisma.admin,
    };

    const userModel = roleMapToModel[role];
    if (!userModel) throw new NotFoundException(`Role ${role} not found.`);
    return userModel.findUnique({ where: { id: userId } });
  }

  getUserFromToken(token: string): Promise<User> {
    const id = this.jwtService.decode(token)['userId'];
    return this.prisma.user.findUnique({ where: { id } });
  }

  generateTokens(payload: { userId: string; role: string }): Token {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  private generateAccessToken(payload: { userId: string }): string {
    return this.jwtService.sign(payload, { expiresIn: '24h' });
  }

  private generateRefreshToken(payload: { userId: string }): string {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: securityConfig.refreshIn,
    });
  }

  refreshToken(token: string) {
    try {
      const { userId } = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      return this.generateTokens({
        userId,
        role: 'test',
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}

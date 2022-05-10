import { Body, Controller, Headers, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data: any, @Headers('bb-role') role: string) {
    console.log('login', 'role', role);
    return this.authService.login(data.email, data.password, role);
  }

  @Post('signup')
  async signup(@Body() data: any, @Headers('bb-role') role: string) {
    console.log('signup', 'role', role);
    return this.authService.createUser(data, role);
  }
}

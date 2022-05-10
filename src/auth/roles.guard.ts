import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const handlerRoles =
      this.reflector.get<string[]>('roles', context.getHandler()) ?? [];

    const classRoles =
      this.reflector.get<string[]>('roles', context.getClass()) ?? [];

    let roles = handlerRoles;

    if (handlerRoles.length === 0) {
      roles = classRoles;
    }

    console.log('class roles', classRoles);
    if (!roles || !roles.length) {
      return true;
    }
    const user = context.switchToHttp().getRequest().user;
    console.log("Checking user's permission", user, roles);
    return roles.includes(user.role);
  }
}

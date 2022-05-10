import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: ('admin' | 'verifier' | 'client')[]) =>
  SetMetadata('roles', roles);

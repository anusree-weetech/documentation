import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(
      'IS_PUBLIC',
      context.getHandler(),
    );
    if (isPublic) return true; // ✅ Skip the guard if metadata is set

    const request = context.switchToHttp().getRequest();
    if (!request.session || !request.session.user) {
      throw new UnauthorizedException('Session expired. Please log in again');
    }

    return true;
  }
}

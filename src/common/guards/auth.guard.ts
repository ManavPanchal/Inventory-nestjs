import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { Roles } from '../roles.decorator';
import * as jwt from 'jsonwebtoken';
import { RequestWithUser } from '../common.util';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const request: RequestWithUser = context.switchToHttp().getRequest();

    const token = request.headers.authorization;

    try {
      if (!token) throw new UnauthorizedException('authTokenMissing');

      const user = jwt.verify(token, process.env.JWT_SECRET as string);
      request.user = user;
      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}

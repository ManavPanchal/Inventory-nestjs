import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Roles } from '../roles.decorator';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    // const roles = this.reflector.get(Roles, context.getHandler());
    // if (!roles) {
    //   return true;
    // }
    const request: Request = context.switchToHttp().getRequest();

    const token = request.headers.authorization;

    try {
      if (!token) throw new UnauthorizedException('authTokenMissing');

      const user = jwt.verify(token, process.env.JWT_SECRET as string);
      console.log(user);
    } catch (error) {
      console.log(error);
      throw error;
    }
    return true;
  }
}

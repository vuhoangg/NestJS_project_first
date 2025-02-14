
import {
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import {Request} from 'express';
import { IS_PUBLIC_KEY } from 'src/decorator/customize';
  
  @Injectable()
  export class JwtAuthGuard extends AuthGuard('jwt') {

    constructor(private reflector: Reflector) {
        super();
      }
      canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
          context.getHandler(),
          context.getClass(),
        ]);
        if (isPublic) {
          return true;
        }
        return super.canActivate(context);
      }
  
    handleRequest(err, user, info, context: ExecutionContext) {
      const request: Request = context.switchToHttp().getRequest();
    if (err) {
      console.error('Lỗi phát sinh trong quá trình xác thực:', err.message);
      throw new UnauthorizedException('Authentication Error , Please check again');
    }
    if (!user) {
      console.error('Thông tin lỗi:', info?.message || 'Không có thông tin lỗi');
      if (info?.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token has expired. Please login again ');
      } else if (info?.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid token. Please check the token .');
      } else {
        throw new UnauthorizedException('Cannot authenticate. Please try again .');
      }
    }

    const targetMethod = request.method;
    const targetEndpoint = request.route?.path as string ;
    const permissions = user?.permissions ?? [];
    let isExist = permissions.find(permission => targetMethod === permission.method && targetEndpoint === permission.apiPath )

    if(targetEndpoint.startsWith("/api/v1/auth")){ isExist = true ;}
      if(!isExist){
        throw new ForbiddenException (" Bạn không có quyền truy cập endpoint này ")
      }
      return user;
    }
  }
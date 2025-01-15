
import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
  import { AuthGuard } from '@nestjs/passport';
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
  
    handleRequest(err, user, info) {
   
    if (err) {
      console.error('Lỗi phát sinh trong quá trình xác thực:', err.message);
      throw new UnauthorizedException('Authentication Error , Please check again');
    }

    if (!user) {
      // Log thông tin về lỗi (ví dụ: token hết hạn, không hợp lệ, v.v.)
      console.error('Thông tin lỗi:', info?.message || 'Không có thông tin lỗi');
      if (info?.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token has expired. Please login again ');
      } else if (info?.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid token. Please check the token .');
      } else {
        throw new UnauthorizedException('Cannot authenticate. Please try again .');
      }
    }
      return user;
    }
  }
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IUser } from 'src/users/users.interface';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    

  ) {
    console.log('JWT_ACCESS_TOKEN_SECRET:', configService.get<string>('JWT_ACCESS_TOKEN_SECRET'));
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
      
    });
  }

  async validate(payload: IUser) {
    return { _id: payload._id,  name: payload.name, email : payload.email ,  role: payload.role,};
  }
}
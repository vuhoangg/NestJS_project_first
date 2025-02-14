import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IUser } from 'src/users/users.interface';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { Response  } from 'express'
import * as ms from 'ms';
import { RolesService } from 'src/roles/roles.service';
@Injectable()
export class AuthService {
    constructor(
      private usersService: UsersService,
      private jwtService: JwtService,
      private configService: ConfigService, 
      private rolesService: RolesService
    
    ) 
    {}

    async validateUser(username: string, pass: string): Promise<any> {
      const user = await this.usersService.findOneByUsername(username);
    if(user){
        const isValid = this.usersService.isValidPassword(pass, user.password)
        console.log("isValid check ", isValid);
        if(isValid === true)
        {
          // get information of role with user =>userRole 
          const userRole = user.role as unknown as { _id: string; name: string }
          const temp = await this.rolesService.findOne(userRole._id);// get Role by id 
          // 
          if (temp === 'not found') {
            return null; // Hoặc xử lý lỗi theo cách bạn muốn
          }
          const objUser ={
            ...user.toObject(),
            permissions :temp?.permissions ?? [],
          }
            return objUser;
        }
    }

      return null;
    }

    async login(user: IUser, response: Response ) {
      const { _id, name , email, role, permissions } = user ;
      const payload = { 
        sub: "Token login " ,
        iss: "from server ",
      _id,
      name, 
      email,
      role, 
      };

    const refresh_token = this.createRefreshToken(payload);
    console.log("refresh token ", )
    await this.usersService.updateUserToken(refresh_token, _id);
    //set cookies 
    response.cookie('refresh_Token', 'hoangvu11', {
      httpOnly :true,
       maxAge: 36000000
    })
    // get date expire with configService 
    const jwtExpirationTime = this.configService.get<string>('JWT_EXPIRE')  ;
      return {
        access_token: this.jwtService.sign(payload, { expiresIn: jwtExpirationTime }),
        user:{  _id, name, email, role, permissions},
      };
    }



    async register (user: RegisterUserDto ) {
      let newUser = await this.usersService.register(user);
      console.log("id ", newUser._id);
      console.log("id ", newUser.createAt);
      return {
        _id: newUser?._id,
        createAt: newUser?.createAt,
      }
    }

    createRefreshToken = (payload: any ) =>{
     const refresh_token =  this.jwtService.sign(payload,{
      secret: this.configService.get<string>("JWT_REFRESH_TOKEN_SECRET"),
      expiresIn: this.configService.get<string>("JWT_REFRESH_EXPIRE"),
     });
     return refresh_token ;
    }

    logout = async (response: Response, user: IUser ) =>{
      await this.usersService.updateUserToken("", user._id);
      response.clearCookie("refresh_Token");
      return "ok";
    }

    
}



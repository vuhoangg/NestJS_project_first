import { Controller, Get,Res, Req , Post, UseGuards, Body } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { Request, Response  } from 'express'
import { IUser } from 'src/users/users.interface';






@Controller("auth")
export class AuthController {
  constructor(
   
    private configService: ConfigService,
    private authService: AuthService
  ) {}

 
  // @UseGuards(JwtAuthGuard)

  @Public()
  @UseGuards(LocalAuthGuard)
  @ResponseMessage("User login")
  @Post('/login')
  handleLogin(
    @Req() req,
    @Res({ passthrough: true }) response: Response){
    return this.authService.login(req.user, response);
  }

  @Public()
  @Post('/register')
  handleRegister(@Body() registerUserDto: RegisterUserDto ){
    return this.authService.register(registerUserDto)
  }

  @ResponseMessage("Get user information ")
  @Get('/account')
  handleGetAccount(@User() user : IUser){
    return {user};
  }

  @ResponseMessage("Logout user")
  @Post('/logout')
  handleLogout(
    @User() user : IUser,
    @Res({ passthrough: true }) response: Response
  ){
    return this.authService.logout(response, user) 
  }

  
}


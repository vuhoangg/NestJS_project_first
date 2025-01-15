import { Controller,Request, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
// import { AuthService } from './auth/auth.service';
import { Public } from './decorator/customize';


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
    // private authService: AuthService


  ) {}

  @Get()
  getHello(): string {
  
    console.log("check port >>", this.configService.get<string>("PORT") || 'Không có cổng');
    return this.appService.getHello();
  }
  
  
}


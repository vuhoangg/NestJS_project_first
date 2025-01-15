import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { Request, Response } from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { Injectable, ValidationPipe, VersioningType } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { TransformInterceptor } from './core/logging.interceptor';
import * as cookieParser from 'cookie-parser';



async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const port = app.get(ConfigService).get<string>('PORT') || 3000; 
  const mongoURI = app.get(ConfigService).get<string>('MONGO_URI') || 202 ;

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  app.useGlobalPipes(new ValidationPipe());
  // config Cookies 
  app.use(cookieParser());
  // config CORS 
  app.enableCors(
    {
      "origin": true,
      "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
      "preflightContinue": false,
      "optionsSuccessStatus": 204,
      credentials: true 
    }
  );
  app.useGlobalInterceptors(new TransformInterceptor(reflector));


  // config version 
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1', '2']
  });
  console.log('Starting server on port', port);
  console.log('show MongoURI ', mongoURI)  // Thêm log kiểm tra
  await app.listen(port);

}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { Request, Response, NextFunction } from 'express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe());

  app.use(bodyParser.json());

  app.use((req: Request, res: Response, next: NextFunction) => {

    next();
  });

  app.enableCors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

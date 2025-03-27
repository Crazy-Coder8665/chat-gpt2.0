import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Set up EJS as the view engine
  app.setViewEngine('ejs');
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  // Serve static files
  app.use(express.static(join(__dirname, '..', 'public')));

  // Enable CORS
  app.enableCors();

  await app.listen(3000);
}
bootstrap();

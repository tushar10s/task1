import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
async function bootstrap() {

  dotenv.config();
  const app = await NestFactory.create(AppModule);


  const config = new DocumentBuilder()
    .addBasicAuth()
    .setTitle('Weather-API example')
    .setDescription('The weather API description')
    .setVersion('1.0')
    
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();

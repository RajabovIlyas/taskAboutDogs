import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Start PORT');
  app.setGlobalPrefix('api');
  app.enableCors();
  await app.listen(process.env.PORT || 5000);
  logger.log(`Server started on port: ${process.env.PORT || 5000}`);
}

bootstrap();

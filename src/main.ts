import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // test db connection
  const dataSource = app.get(DataSource);
  if (dataSource.isInitialized) {
    console.log('Database connected successfully!');
  } else {
    console.error('Database connection failed');
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

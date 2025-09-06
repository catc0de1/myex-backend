import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // test db connection
  const dataSource = app.get(DataSource);
  if (dataSource.isInitialized) {
    console.log('Database connected successfully!');
  } else {
    console.error('Database connection failed');
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

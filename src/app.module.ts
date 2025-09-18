import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ItemsModule } from './items/items.module';
import { AppConfigModule } from './config/config.module';
import { RedisModule } from './config/redis.module';
import { DatabaseModule } from './config/database.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    RedisModule,

    UsersModule,
    ItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

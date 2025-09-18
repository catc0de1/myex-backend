import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ItemsModule } from './items/items.module';
import { RedisModule } from './modules/redis.module';
import { DatabaseModule } from './modules/database.module';

@Module({
  imports: [
    // load env and make it global
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    DatabaseModule,
    RedisModule,

    UsersModule,
    ItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

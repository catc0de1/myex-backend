import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthController } from '@auth/auth.controller';
import { AuthService } from '@auth/auth.service';
import { UsersModule } from '@users/users.module';
import { CurrentUserMiddleware } from '@auth/middlewares/current-user.middleware';

@Module({
  imports: [UsersModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes({
      path: 'items/:id',
      method: RequestMethod.PATCH,
    });
  }
}

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { UserDto } from '../users/dtos/user.dto';

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // Run something before a request is handled by the request handler
    // console.log('Running before the handler', context);
    return next.handle().pipe(
      map((data: any) => {
        // Run something before the response is sent out or after the request is handled by the request handler
        // console.log('Running after the handler', data);

        return plainToClass(UserDto, data, { excludeExtraneousValues: true });
      }),
    );
  }
}

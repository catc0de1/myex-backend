import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  isOnline(): string {
    return 'Server is online!';
  }
}

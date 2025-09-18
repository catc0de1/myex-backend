import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { UsersService } from '../users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register(name: string, email: string, password: string) {
    const users = await this.usersService.findAll({ email });
    if (users.length) {
      throw new BadRequestException('Email sudah terdaftar');
    }

    const hashedPassword = await argon2.hash(password);

    const user = await this.usersService.create(name, email, hashedPassword);

    return user;
  }

  async login(email: string, password: string) {
    const [user] = await this.usersService.findAll({ email });
    if (!user) {
      throw new NotFoundException('Email tidak ditemukan');
    }

    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      throw new BadRequestException('Password salah');
    }

    return user;
  }
}

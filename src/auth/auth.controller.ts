import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
} from '@nestjs/common';
import { Serialize } from '@/interceptors/serialize.interceptor';
import { CurrentUser } from '@/auth/decorators/current-user.decorator';
import { AuthResponseDto } from '@/auth/dtos/auth-response.dto';
import { CreateUserDto } from '@/users/dtos/create-user.dto';
import { AuthService } from '@/auth/auth.service';
import { LoginUserDto } from '@/auth/dtos/login-user.dto';
import type { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @Serialize(AuthResponseDto)
  async register(@Body() body: CreateUserDto, @Req() req: Request) {
    const user = await this.authService.register(
      body.name,
      body.email,
      body.password,
    );

    req.session.userId = user.id;
    // console.log(req.session.userId);

    return { message: 'Register successfully', user };
  }

  @Post('/login')
  @Serialize(AuthResponseDto)
  async login(@Body() body: LoginUserDto, @Req() req: Request) {
    const user = await this.authService.login(body.email, body.password);

    req.session.userId = user.id;
    // console.log(req.session.userId);

    return { message: 'Login successfully', user };
  }

  @Post('/logout')
  async logout(@Req() req: Request) {
    // console.log('logout sessionID:', req.sessionID);
    // console.log('logout session:', req.session);
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          reject(new BadRequestException('Logout failed'));
        }
        resolve({ message: 'Logout successfully' });
      });
    });
  }

  @Get('whoami')
  whoAmI(@CurrentUser() user: string) {
    return user;
  }
}

import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Query,
  Patch,
  Delete,
  ParseIntPipe,
  Req,
  Res,
  // UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { FindUserDto } from './dtos/find-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { AuthResponseDto } from './dtos/auth-response.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth/auth.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import type { Request, Response } from 'express';
import type { User } from './user.entity';
import { plainToInstance } from 'class-transformer';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get()
  findAllUsers(@Query() query: FindUserDto): Promise<User[]> {
    return this.usersService.findAll(query);
  }

  @Post()
  createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.usersService.create(body.name, body.email, body.password);
  }

  // @Serialize(UserDto) // Method level interceptor (overrides class level)
  @Get('/:id')
  findUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    // console.log('Handler is running');

    return this.usersService.findOne(id);
  }

  @Patch('/:id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, body);
  }

  @Delete('/:id')
  removeUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.remove(id);
  }

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

    return {
      message: 'Login successfully',
      user: plainToInstance(UserDto, user),
    };
  }

  @Post('/logout')
  logout(@Req() req: Request, @Res() res: Response) {
    // console.log('logout sessionID:', req.sessionID);
    // console.log('logout session:', req.session);

    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Logout failed' });
      }
      res.clearCookie('connect.sid');

      return res.json({ message: 'Logout successfully' });
    });
  }
}

import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { FindUserDto } from './dtos/find-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import type { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAllUsers(@Query() query: FindUserDto): Promise<User[]> {
    return this.usersService.findAll(query);
  }

  @Post()
  createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.usersService.create(body.name, body.email, body.password);
  }

  @Get('/:id')
  findUser(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(parseInt(id));
  }

  @Patch('/:id')
  updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(parseInt(id), body);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(parseInt(id));
  }
}

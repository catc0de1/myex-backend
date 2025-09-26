import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ItemsService } from '@items/items.service';
import { CreateItemDto } from '@items/dtos/create-item.dto';
import { Item } from '@items/item.entity';
import { User } from '@users/user.entity';
import { AuthGuard } from '@guard/auth.guard';
import { CurrentSession } from '@auth/decorators/current-session.decorator';
import { Serialize } from '@/interceptors/serialize.interceptor';
import { ItemDto } from './dtos/item.dto';
import { ApproveItemDto } from './dtos/approve-item.dto';
import { AdminGuard } from '@guard/admin.guard';

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Post()
  @UseGuards(AuthGuard)
  createItem(
    @Body() body: CreateItemDto,
    @CurrentSession() user: User,
  ): Promise<Item> {
    return this.itemsService.create(body, user);
  }

  @Get('/:id')
  @Serialize(ItemDto)
  findItem(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.findOne(id);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ApproveItemDto,
  ) {
    return this.itemsService.approveItem(id, body.approved);
  }
}

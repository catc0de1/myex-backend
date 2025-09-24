import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ItemsService } from '@items/items.service';
import { CreateItemDto } from '@items/dtos/create-item.dto';
import { Item } from '@items/item.entity';
import { User } from '@users/user.entity';
import { AuthGuard } from '@guard/auth.guard';
import { CurrentUser } from '@auth/decorators/current-user.decorator';

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Post()
  @UseGuards(AuthGuard)
  createItem(
    @Body() body: CreateItemDto,
    @CurrentUser() user: User,
  ): Promise<Item> {
    return this.itemsService.create(body, user);
  }

  @Get('/:id')
  findItem(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.findOne(id);
  }
}

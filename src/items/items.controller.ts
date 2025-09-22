import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ItemsService } from '@/items/items.service';
import { CreateItemDto } from '@/items/dtos/create-item.dto';
import { Item } from '@/items/item.entity';
import { AuthGuard } from '@/guard/auth.guard';

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Post()
  @UseGuards(AuthGuard)
  createItem(@Body() body: CreateItemDto): Promise<Item> {
    return this.itemsService.create(body);
  }
}

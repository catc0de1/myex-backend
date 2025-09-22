import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '@/items/item.entity';
import { Repository } from 'typeorm';
import { CreateItemDto } from '@/items/dtos/create-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private itemRepository: Repository<Item>,
  ) {}

  create(item: CreateItemDto) {
    const newItem = this.itemRepository.create(item);
    return this.itemRepository.save(newItem);
  }
}

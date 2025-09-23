import {
  AfterInsert,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterUpdate,
  AfterRemove,
  OneToMany,
} from 'typeorm';
import { Item } from '@/items/item.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Item, (item) => item.user)
  items: Item[];

  @AfterInsert()
  logInsert() {
    console.log(`User with ID ${this.id} has been inserted.`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`User with ID ${this.id} has been updated.`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`User with ID ${this.id} has been removed.`);
  }
}

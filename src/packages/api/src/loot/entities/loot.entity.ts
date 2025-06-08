import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './item.entity';

export class Loot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  creatureName: string;

  @Column()
  timestamp: number;

  @OneToMany(() => Item, (item) => item.loot, { cascade: true, eager: true })
  items: Item[];
}

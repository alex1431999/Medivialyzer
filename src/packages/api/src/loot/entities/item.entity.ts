import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Loot } from './loot.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  amount: number;

  @ManyToOne(() => Loot, (loot) => loot.items)
  loot: Loot;
}

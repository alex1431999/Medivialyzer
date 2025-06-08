import { ManyToOne } from 'typeorm';
import { Loot } from './loot.entity';

export class Item {
  @ManyToOne(() => Loot, (loot) => loot.items)
  loot: Loot;
}

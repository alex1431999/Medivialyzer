import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './item.entity';

@Entity()
export class Loot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clientId: string;

  @Column()
  creatureName: string;

  @Column()
  timestamp: number;

  @OneToMany(() => Item, (item) => item.loot, { cascade: true, eager: true })
  items: Item[];
}

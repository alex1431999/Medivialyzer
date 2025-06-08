import { Column, PrimaryGeneratedColumn } from 'typeorm';

// TODO items are ignored for now
export class Loot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  creatureName: string;

  @Column()
  timestamp: number;
}

import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from '../../client/entities/client.entity';
import { Waste } from './waste.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Client, { onDelete: 'CASCADE' })
  owner: Client;

  @Column({ nullable: false })
  name: string;

  @Column('int', { nullable: true })
  lootAmount: number | null;

  @Column({ type: 'timestamp', nullable: true })
  resetTimestamp: Date | null;

  @ManyToMany(() => Client)
  @JoinTable()
  members: Client[];

  @OneToMany(() => Waste, (waste) => waste.team)
  wastes: Waste[];
}

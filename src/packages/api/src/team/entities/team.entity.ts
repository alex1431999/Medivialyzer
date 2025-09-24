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

  @ManyToOne(() => Client)
  owner: Client;

  @Column()
  name: string;

  @ManyToMany(() => Client)
  @JoinTable()
  members: Client[];

  @OneToMany(() => Waste, (waste) => waste.team)
  wastes: Waste[];
}

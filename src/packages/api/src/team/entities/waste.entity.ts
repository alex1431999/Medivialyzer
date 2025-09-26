import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Team } from './team.entity';
import { Client } from '../../client/entities/client.entity';

@Entity()
export class Waste {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  wasteAmount: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Team, (team) => team.wastes, { onDelete: 'CASCADE' })
  team: Team;

  @ManyToOne(() => Client, (client) => client.wastes, { onDelete: 'CASCADE' })
  client: Client;
}

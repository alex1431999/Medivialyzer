import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Team } from './team.entity';
import { Client } from '../../client/entities/client.entity';

@Entity()
export class Waste {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('number')
  wasteAmount: number;

  @ManyToOne(() => Team, (team) => team.wastes, { onDelete: 'CASCADE' })
  team: Team;

  @ManyToOne(() => Client, (client) => client.wastes)
  client: Client;
}

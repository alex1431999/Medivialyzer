import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from '../../client/entities/client.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Client, (client) => client.ownedTeams)
  owner: Client;

  @Column()
  name: string;

  @ManyToMany(() => Client, (client) => client.joinedTeams)
  @JoinTable()
  members: Client[];
}

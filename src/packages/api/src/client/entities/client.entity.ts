import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Team } from '../../team/entities/team.entity';
import { Waste } from '../../team/entities/waste.entity';

@Entity()
export class Client {
  @PrimaryColumn({ unique: true })
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Team, (team) => team.owner, { cascade: true })
  ownedTeams: Team[];

  @ManyToMany(() => Team, (team) => team.members)
  @JoinTable()
  joinedTeams: Team[];

  @OneToMany(() => Waste, (waste) => waste.client)
  wastes: Waste[];
}

import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Waste } from '../../team/entities/waste.entity';

@Entity()
export class Client {
  @PrimaryColumn({ unique: true })
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Waste, (waste) => waste.client)
  wastes: Waste[];
}

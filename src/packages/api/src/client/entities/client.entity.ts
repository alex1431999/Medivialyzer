import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Client {
  @PrimaryColumn({ unique: true })
  id: number;
}

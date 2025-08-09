import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Client {
  @PrimaryColumn()
  id: number;
}

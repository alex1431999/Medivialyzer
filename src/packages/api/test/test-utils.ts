import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from '../src/team/entities/team.entity';
import { Client } from '../src/client/entities/client.entity';
import { Waste } from '../src/team/entities/waste.entity';

export const mockRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
});

export const TEST_DB_IMPORTS = [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [Team, Client, Waste],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([Team, Client, Waste]),
];

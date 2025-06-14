import { TypeOrmModule } from '@nestjs/typeorm';
import { Loot } from '../src/loot/entities/loot.entity';
import { Item } from '../src/loot/entities/item.entity';

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
    entities: [Loot, Item],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([Loot, Item]),
];

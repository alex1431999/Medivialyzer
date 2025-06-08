import { Test, TestingModule } from '@nestjs/testing';
import { LootService } from './loot.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Loot } from './entities/loot.entity';
import { mockRepository } from '../../test/test-utils';
import { Item } from './entities/item.entity';

describe('LootService', () => {
  let service: LootService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LootService,
        {
          provide: getRepositoryToken(Loot),
          useFactory: mockRepository,
        },
        {
          provide: getRepositoryToken(Item),
          useFactory: mockRepository,
        },
      ],
    }).compile();

    service = module.get<LootService>(LootService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { LootController } from './loot.controller';
import { LootService } from './loot.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Loot } from './entities/loot.entity';
import { mockRepository } from '../../test/test-utils';
import { Item } from './entities/item.entity';

describe('LootController', () => {
  let controller: LootController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LootController],
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

    controller = module.get<LootController>(LootController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

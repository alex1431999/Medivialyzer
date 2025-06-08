import { Test, TestingModule } from '@nestjs/testing';
import { LootController } from './loot.controller';
import { LootService } from './loot.service';

describe('LootController', () => {
  let controller: LootController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LootController],
      providers: [LootService],
    }).compile();

    controller = module.get<LootController>(LootController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

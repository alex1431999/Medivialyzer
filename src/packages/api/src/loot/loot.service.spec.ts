import { Test, TestingModule } from '@nestjs/testing';
import { LootService } from './loot.service';

describe('LootService', () => {
  let service: LootService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LootService],
    }).compile();

    service = module.get<LootService>(LootService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { TeamService } from './team.service';
import { TEST_DB_IMPORTS } from '../../test/test-utils';

describe('TeamService', () => {
  let service: TeamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeamService],
      imports: TEST_DB_IMPORTS,
    }).compile();

    service = module.get<TeamService>(TeamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

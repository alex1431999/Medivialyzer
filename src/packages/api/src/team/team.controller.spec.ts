import { Test, TestingModule } from '@nestjs/testing';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { TEST_DB_IMPORTS } from '../../test/test-utils';
import { TeamGateway } from './team.gateway';
import { ClientService } from '../client/client.service';

describe('TeamController', () => {
  let controller: TeamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamController],
      providers: [TeamService, TeamGateway, ClientService],
      imports: TEST_DB_IMPORTS,
    }).compile();

    controller = module.get<TeamController>(TeamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

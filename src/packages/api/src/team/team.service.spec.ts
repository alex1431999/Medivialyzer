import { Test, TestingModule } from '@nestjs/testing';
import { TeamService } from './team.service';
import { TEST_DB_IMPORTS } from '../../test/test-utils';
import { ClientService } from '../client/client.service';

describe('TeamService', () => {
  let teamService: TeamService;
  let clientService: ClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeamService, ClientService],
      imports: TEST_DB_IMPORTS,
    }).compile();

    teamService = module.get<TeamService>(TeamService);
    clientService = module.get<ClientService>(ClientService);
  });

  it('can create team', async () => {
    await clientService.create({ id: 'abc' });
    await teamService.create({
      name: 'test',
      owner: 'abc',
    });
  });
});

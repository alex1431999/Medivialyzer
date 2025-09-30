import { Test, TestingModule } from '@nestjs/testing';
import { TeamService } from './team.service';
import { TEST_DB_IMPORTS } from '../../test/test-utils';
import { ClientService } from '../client/client.service';
import { BadRequestException } from '@nestjs/common';

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
    await clientService.create({ id: 'abc', name: 'test' });
    await teamService.create({
      name: 'test',
      owner: 'abc',
    });
  });

  it('can find all by client', async () => {
    await clientService.create({ id: 'owner', name: 'test' });
    await clientService.create({ id: 'member', name: 'test' });

    const { id: teamId } = await teamService.create({
      name: 'test',
      owner: 'owner',
    });

    await teamService.createMember(teamId, { id: 'member' });

    const teams = await teamService.findAllByClient('member');

    expect(teams.length).toBe(1);
  });

  it('cant join a team you are already part of', async () => {
    await clientService.create({ id: 'owner', name: 'test' });

    const { id: teamId } = await teamService.create({
      name: 'test',
      owner: 'owner',
    });

    await expect(
      teamService.createMember(teamId, { id: 'owner' }),
    ).rejects.toThrow(BadRequestException);
  });
});

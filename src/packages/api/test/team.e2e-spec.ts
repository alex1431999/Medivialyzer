import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { TEST_DB_IMPORTS } from './test-utils';
import { TeamController } from '../src/team/team.controller';
import { ClientController } from '../src/client/client.controller';
import { TeamService } from '../src/team/team.service';
import { TeamGateway } from '../src/team/team.gateway';
import { ClientService } from '../src/client/client.service';
import { TeamDto } from '../src/team/dto/team.dto';
import { App } from 'supertest/types';

describe('TeamController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: TEST_DB_IMPORTS,
      controllers: [TeamController, ClientController],
      providers: [TeamService, TeamGateway, ClientService],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/team (POST) is able to create a team', async () => {
    await request(app.getHttpServer())
      .post('/client')
      .send({ id: 'owner-e2e', name: 'owner-e2e' });

    return request(app.getHttpServer())
      .post('/team')
      .send({ owner: 'owner-e2e', name: 'team' })
      .expect(201);
  });

  it('/team (POST) should not accept empty value for name', async () => {
    await request(app.getHttpServer())
      .post('/client')
      .send({ id: 'owner-e2e', name: 'owner-e2e' });

    return request(app.getHttpServer())
      .post('/team')
      .send({ owner: 'owner-e2e', name: '' })
      .expect(400);
  });

  it('/team (POST) should return 404 if owner does not exist', async () => {
    return request(app.getHttpServer())
      .post('/team')
      .send({ owner: 'does-not-exist', name: 'team' })
      .expect(404);
  });

  it('/team/client/:clientId (GET) should return all teams for a client', async () => {
    await request(app.getHttpServer())
      .post('/client')
      .send({ id: 'owner-e2e', name: 'owner-e2e' });

    await request(app.getHttpServer())
      .post('/team')
      .send({ owner: 'owner-e2e', name: 'team' });

    const response = await request(app.getHttpServer()).get(
      '/team/client/owner-e2e',
    );

    expect(response.status).toBe(200);
    expect(response.body as TeamDto[]).toHaveLength(1);
  });

  it('/team/client/:clientId (GET) should return 404 if client does not exist', async () => {
    return request(app.getHttpServer())
      .get('/team/client/does-not-exist')
      .expect(404);
  });

  it('/team/:id (GET) should return a team', async () => {
    await request(app.getHttpServer())
      .post('/client')
      .send({ id: 'owner-e2e', name: 'owner-e2e' });

    const teamResponse = await request(app.getHttpServer())
      .post('/team')
      .send({ owner: 'owner-e2e', name: 'team' });
    const team = teamResponse.body as TeamDto;

    const response = await request(app.getHttpServer()).get(`/team/${team.id}`);

    expect(response.status).toBe(200);
    expect((response.body as TeamDto).name).toBe('team');
  });

  it('/team/:id (GET) should return all members of a team', async () => {
    await request(app.getHttpServer())
      .post('/client')
      .send({ id: 'owner-e2e', name: 'owner-e2e' });

    await request(app.getHttpServer())
      .post('/client')
      .send({ id: 'member-1', name: 'member-1' });

    await request(app.getHttpServer())
      .post('/client')
      .send({ id: 'member-2', name: 'member-2' });

    const teamResponse = await request(app.getHttpServer())
      .post('/team')
      .send({ owner: 'owner-e2e', name: 'team' });
    const team = teamResponse.body as TeamDto;

    await request(app.getHttpServer())
      .post(`/team/${team.id}/members`)
      .send({ id: 'member-1' });

    await request(app.getHttpServer())
      .post(`/team/${team.id}/members`)
      .send({ id: 'member-2' });

    const response = await request(app.getHttpServer()).get(`/team/${team.id}`);

    expect(response.status).toBe(200);
    expect((response.body as TeamDto).members).toHaveLength(2);
  });

  it('/team/:id (PATCH) should update a team', async () => {
    await request(app.getHttpServer())
      .post('/client')
      .send({ id: 'owner-e2e', name: 'owner-e2e' });

    const teamResponse = await request(app.getHttpServer())
      .post('/team')
      .send({ owner: 'owner-e2e', name: 'team' });
    const team = teamResponse.body as TeamDto;

    await request(app.getHttpServer())
      .patch(`/team/${team.id}`)
      .send({ name: 'new name' })
      .expect(200);
  });

  it('/team/:id (PATCH) should return 404 if team does not exist', async () => {
    return request(app.getHttpServer())
      .patch('/team/does-not-exist')
      .send({ name: 'new name' })
      .expect(404);
  });

  it('/team/:id (DELETE) should delete a team', async () => {
    await request(app.getHttpServer())
      .post('/client')
      .send({ id: 'owner-e2e', name: 'owner-e2e' });

    const teamResponse = await request(app.getHttpServer())
      .post('/team')
      .send({ owner: 'owner-e2e', name: 'team' });
    const team = teamResponse.body as TeamDto;

    await request(app.getHttpServer()).delete(`/team/${team.id}`).expect(200);

    return request(app.getHttpServer()).get(`/team/${team.id}`).expect(404);
  });

  it('/team/:id (DELETE) should return 404 if team does not exist', async () => {
    return request(app.getHttpServer())
      .delete('/team/does-not-exist')
      .expect(404);
  });

  it('/:id/members (POST) should add a member to a team', async () => {
    await request(app.getHttpServer())
      .post('/client')
      .send({ id: 'owner-e2e', name: 'owner-e2e' });

    await request(app.getHttpServer())
      .post('/client')
      .send({ id: 'member-e2e', name: 'member-e2e' });

    const teamResponse = await request(app.getHttpServer())
      .post('/team')
      .send({ owner: 'owner-e2e', name: 'team' });
    const team = teamResponse.body as TeamDto;

    const response = await request(app.getHttpServer())
      .post(`/team/${team.id}/members`)
      .send({ id: 'member-e2e' });

    expect(response.status).toBe(201);
    expect((response.body as TeamDto).members).toHaveLength(1);
  });

  it('/:id/members (POST) cant add a member that doesnt exist', async () => {
    await request(app.getHttpServer())
      .post('/client')
      .send({ id: 'owner-e2e', name: 'owner-e2e' });

    const teamResponse = await request(app.getHttpServer())
      .post('/team')
      .send({ owner: 'owner-e2e', name: 'team' });
    const team = teamResponse.body as TeamDto;

    return request(app.getHttpServer())
      .post(`/team/${team.id}/members`)
      .send({ id: 'does not exist' })
      .expect(404);
  });

  it('/:id/members (POST) should not add a member that is already in the team', async () => {
    await request(app.getHttpServer())
      .post('/client')
      .send({ id: 'owner-e2e', name: 'owner-e2e' });

    const teamResponse = await request(app.getHttpServer())
      .post('/team')
      .send({ owner: 'owner-e2e', name: 'team' });
    const team = teamResponse.body as TeamDto;

    await request(app.getHttpServer())
      .post(`/team/${team.id}/members`)
      .send({ id: 'owner-e2e' });

    return request(app.getHttpServer())
      .post(`/team/${team.id}/members`)
      .send({ id: 'owner-e2e' })
      .expect(400);
  });

  it('/:id/members/:memberId (DELETE) should remove a member from a team', async () => {
    await request(app.getHttpServer())
      .post('/client')
      .send({ id: 'owner-e2e', name: 'owner-e2e' });

    await request(app.getHttpServer())
      .post('/client')
      .send({ id: 'member-e2e', name: 'member-e2e' });

    const teamResponse = await request(app.getHttpServer())
      .post('/team')
      .send({ owner: 'owner-e2e', name: 'team' });
    const team = teamResponse.body as TeamDto;

    await request(app.getHttpServer())
      .post(`/team/${team.id}/members`)
      .send({ id: 'member-e2e' });

    await request(app.getHttpServer())
      .delete(`/team/${team.id}/members/member-e2e`)
      .expect(200);

    const response = await request(app.getHttpServer()).get(`/team/${team.id}`);

    expect((response.body as TeamDto).members).toHaveLength(0);
  });

  it('/:id/members/:memberId (DELETE) should return 404 if member is not in the team', async () => {
    await request(app.getHttpServer())
      .post('/client')
      .send({ id: 'owner-e2e', name: 'owner-e2e' });

    const teamResponse = await request(app.getHttpServer())
      .post('/team')
      .send({ owner: 'owner-e2e', name: 'team' });
    const team = teamResponse.body as TeamDto;

    return request(app.getHttpServer())
      .delete(`/team/${team.id}/members/does-not-exist`)
      .expect(404);
  });

  it('/:id/waste/:memberId (POST) should create waste for a member', async () => {
    await request(app.getHttpServer())
      .post('/client')
      .send({ id: 'owner-e2e', name: 'owner-e2e' });

    const teamResponse = await request(app.getHttpServer())
      .post('/team')
      .send({ owner: 'owner-e2e', name: 'team' });
    const team = teamResponse.body as TeamDto;

    await request(app.getHttpServer())
      .post(`/team/${team.id}/waste/owner-e2e`)
      .send({ wasteAmount: 100 })
      .expect(201);

    const response = await request(app.getHttpServer()).get(`/team/${team.id}`);

    expect((response.body as TeamDto).wastes).toHaveLength(1);
    expect((response.body as TeamDto).wastes[0].wasteAmount).toBe(100);
  });

  it('/:id/waste/:memberId (POST) should not create waste for a member if wasteAmount is not a number', async () => {
    await request(app.getHttpServer())
      .post('/client')
      .send({ id: 'owner-e2e', name: 'owner-e2e' });

    const teamResponse = await request(app.getHttpServer())
      .post('/team')
      .send({ owner: 'owner-e2e', name: 'team' });
    const team = teamResponse.body as TeamDto;

    return request(app.getHttpServer())
      .post(`/team/${team.id}/waste/owner-e2e`)
      .send({ wasteAmount: 'not a number' })
      .expect(400);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { TEST_DB_IMPORTS } from './test-utils';
import { TeamController } from '../src/team/team.controller';
import { ClientController } from '../src/client/client.controller';
import { TeamService } from '../src/team/team.service';
import { TeamGateway } from '../src/team/team.gateway';
import { ClientService } from '../src/client/client.service';
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
    // First create an owner client
    await request(app.getHttpServer())
      .post('/client')
      .send({ id: 'owner-e2e', name: 'owner-e2e' });

    return request(app.getHttpServer())
      .post('/team')
      .send({ owner: 'owner-e2e', name: 'team' })
      .expect(201);
  });

  it('/team (POST) should not accept empty value for name', async () => {
    // First create an owner client
    await request(app.getHttpServer())
      .post('/client')
      .send({ id: 'owner-e2e', name: 'owner-e2e' });

    return request(app.getHttpServer())
      .post('/team')
      .send({ owner: 'owner-e2e', name: '' })
      .expect(400);
  });
});

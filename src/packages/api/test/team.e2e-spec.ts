import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { App } from 'supertest/types';
import { TEST_DB_IMPORTS } from './test-utils';
import { TeamModule } from '../src/team/team.module';

describe('TeamController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TeamModule, ...TEST_DB_IMPORTS],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  afterEach(async () => {
    await app.close();
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

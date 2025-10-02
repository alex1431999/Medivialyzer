import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { TEST_DB_IMPORTS } from './test-utils';
import { ClientController } from '../src/client/client.controller';
import { ClientService } from '../src/client/client.service';
import { ClientDto } from '../src/client/dto/client.dto';
import { App } from 'supertest/types';
import { ClientExistsDto } from '../src/client/dto/client-exists.dto';

describe('ClientController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: TEST_DB_IMPORTS,
      controllers: [ClientController],
      providers: [ClientService],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  // POST /client
  it('/client (POST) should create a client', async () => {
    return request(app.getHttpServer())
      .post('/client')
      .send({ id: 'client-1', name: 'Test Client' })
      .expect(201);
  });

  it('/client (POST) should not create a client with empty name', async () => {
    return request(app.getHttpServer())
      .post('/client')
      .send({ id: 'client-1', name: '' })
      .expect(400);
  });

  it('/client (POST) should not create a client with empty id', async () => {
    return request(app.getHttpServer())
      .post('/client')
      .send({ id: '', name: 'Test Client' })
      .expect(400);
  });

  // GET /client/:id
  it('/client/:id (GET) should return a client', async () => {
    await request(app.getHttpServer())
      .post('/client')
      .send({ id: 'client-1', name: 'Test Client' });

    const response = await request(app.getHttpServer()).get('/client/client-1');

    expect(response.status).toBe(200);
    expect((response.body as ClientDto).name).toBe('Test Client');
  });

  it('/client/:id (GET) should return 404 if client does not exist', async () => {
    return request(app.getHttpServer())
      .get('/client/does-not-exist')
      .expect(404);
  });

  // GET /client/:id/exists
  it('/client/:id/exists (GET) should return true if client exists', async () => {
    await request(app.getHttpServer())
      .post('/client')
      .send({ id: 'client-1', name: 'Test Client' });

    const response = await request(app.getHttpServer()).get(
      '/client/client-1/exists',
    );

    const clientExists: ClientExistsDto = response.body as ClientExistsDto;

    expect(response.status).toBe(200);
    expect(clientExists.exists).toBe(true);
  });

  it('/client/:id/exists (GET) should return false if client does not exist', async () => {
    const response = await request(app.getHttpServer()).get(
      '/client/does-not-exist/exists',
    );

    const clientExists: ClientExistsDto = response.body as ClientExistsDto;

    expect(response.status).toBe(200);
    expect(clientExists.exists).toBe(false);
  });

  // PATCH /client/:id
  it('/client/:id (PATCH) should update a client', async () => {
    await request(app.getHttpServer())
      .post('/client')
      .send({ id: 'client-1', name: 'Test Client' });

    await request(app.getHttpServer())
      .patch('/client/client-1')
      .send({ name: 'Updated Client' })
      .expect(200);

    const response = await request(app.getHttpServer()).get('/client/client-1');
    expect((response.body as ClientDto).name).toBe('Updated Client');
  });

  it('/client/:id (PATCH) should return 404 if client does not exist', async () => {
    return request(app.getHttpServer())
      .patch('/client/does-not-exist')
      .send({ name: 'Updated Client' })
      .expect(404);
  });

  it('/client/:id (PATCH) should not update a client with empty name', async () => {
    await request(app.getHttpServer())
      .post('/client')
      .send({ id: 'client-1', name: 'Test Client' });

    return request(app.getHttpServer())
      .patch('/client/client-1')
      .send({ name: '' })
      .expect(400);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { TEST_DB_IMPORTS } from '../../test/test-utils';
import { LootModule } from './loot.module';
import { LootService } from './loot.service';

describe('Loot (e2e)', () => {
  let app: INestApplication<App>;
  let lootService: LootService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [...TEST_DB_IMPORTS, LootModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    lootService = moduleFixture.get<LootService>(LootService);
  });

  describe('/loot/createMany (POST)', () => {
    it('request is accepted', () => {
      const data = [
        {
          creatureName: 'rotworm',
          clientId: '123',
          timestamp: 0,
          items: [{ name: 'Gold coin', amount: 5 }],
        },
      ];

      return request(app.getHttpServer())
        .post('/loot/createMany')
        .send(data)
        .expect(201);
    });

    it('data has been created', async () => {
      const data = [
        {
          creatureName: 'rotworm',
          clientId: '123',
          timestamp: 0,
          items: [{ name: 'Gold coin', amount: 5 }],
        },
      ];

      await request(app.getHttpServer())
        .post('/loot/createMany')
        .send(data)
        .expect(201);

      const loot = await lootService.findAllByClientId('123');

      expect(loot).toMatchObject(data);
    });
  });
});

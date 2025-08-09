import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from './client.service';
import { TEST_DB_IMPORTS } from '../../test/test-utils';

describe('ClientService', () => {
  let service: ClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientService],
      imports: TEST_DB_IMPORTS,
    }).compile();

    service = module.get<ClientService>(ClientService);
  });

  it('ids should be unique', async () => {
    await expect(service.create({ id: 1 })).resolves.not.toThrow();
    await expect(service.create({ id: 1 })).rejects.toThrow();
  });
});

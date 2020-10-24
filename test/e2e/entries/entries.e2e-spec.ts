import * as request from 'supertest';

import { INestApplication } from '@nestjs/common';
import { EntryModule } from '../../../src/modules/entry/entry.module';
import { EntriesService } from '../../../src/modules/entry/entries.service';
import { Test } from '@nestjs/testing';

describe('Entries', () => {
  let app: INestApplication;
  const mockEntriesService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [EntryModule],
    })
      .overrideProvider(EntriesService)
      .useValue(mockEntriesService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`/Get entries`, () => {
    return request(app.getHttpServer())
      .get('/entries')
      .expect(200)
      .expect({
        data: mockEntriesService.findAll(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});

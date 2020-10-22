import { Test } from '@nestjs/testing';
import { EntriesController } from './entries.controller';
import { EntriesService } from './entries.service';

describe('EntriesController', () => {
  let entriesController: EntriesController;
  let entriesSrv: EntriesService;

  beforeEach(async () => {
    // Instantiate a mock module for testing purpose only
    const module = await Test.createTestingModule({
      // imports: [TypeOrmModule.forFeature([Entry]), CommentModule],
      controllers: [EntriesController],
      // providers: [EntriesService],
    })
      .overrideProvider(EntriesService)
      .useValue({ findAll: () => null })
      .compile();

    entriesSrv = module.get<EntriesService>(EntriesService);
    entriesController = module.get<EntriesController>(EntriesController);
  });

  describe('findAll', () => {
    it('should return an array of entries', async () => {
      jest.spyOn(entriesSrv, 'findAll').mockImplementationOnce(() => []);
      expect(Array.isArray(entriesController.findAll())).toBe(true);
    });
  });
});

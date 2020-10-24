import { Test } from '@nestjs/testing';
import { EntriesController } from './entries.controller';
import { EntriesService } from './entries.service';

describe('EntriesController', () => {
  let entriesController: EntriesController;
  let entriesService: EntriesService;

  beforeEach(async () => {
    // Instantiate a mock module for testing purpose only
    const module = await Test.createTestingModule({
      controllers: [EntriesController],
    })
      .overrideProvider(EntriesService)
      .useValue({ findAll: () => null })
      .compile();

    entriesService = module.get<EntriesService>(EntriesService);
    entriesController = module.get<EntriesController>(EntriesController);
  });

  describe('findAll', () => {
    it('should return an array of entries', async () => {
      jest.spyOn(entriesService, 'findAll').mockImplementationOnce(() => [{}]);
      expect(Array.isArray(await
        entriesController.findAll())).toBe(true);
    });

    it('should return the entries retrieved from the service', async () => {
      const result = [
        {
          title: 'Test title',
          content: 'This tis the test body and will serve to check whether the controller is properly doing its job or not.',
          userId: 1234567,
        },
      ];
      jest.spyOn(entriesService, 'findAll').mockImplementationOnce(async () => result);

      expect(await
        entriesController.findAll()).toEqual(result);
    });
  });
});

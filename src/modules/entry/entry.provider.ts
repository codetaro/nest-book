import { Entry } from './sequelize/entry.entity';

export const entryProvider = {
  provide: 'EntryRepository',
  useValue: Entry
};

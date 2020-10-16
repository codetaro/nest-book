import { KeywordEntry } from './keywordEntry.entity';

export const keywordEntryProvider = {
  provide: 'KeywordEntryRepository',
  useValue: KeywordEntry
};

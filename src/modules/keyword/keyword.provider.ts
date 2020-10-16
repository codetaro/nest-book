import { Keyword } from './keyword.entity';

export const keywordProvider = {
  provide: 'KeywordRepository',
  useValue: Keyword,
};

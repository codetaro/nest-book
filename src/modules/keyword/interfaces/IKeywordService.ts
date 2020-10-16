import { Keyword } from '../keyword.entity';

export interface IKeywordService {
  findAll(): Promise<Keyword[]>;
  findById(id: number): Promise<Keyword | null>;
  findHotLinks(): Promise<Keyword[]>;
}

import { Inject, Injectable } from '@nestjs/common';
import { Entry } from './sequelize/entry.entity';
import { DatabaseUtilitiesService } from '../database/database-utilities.service';
import { IEntry } from './interfaces/IEntry';

@Injectable()
export class EntryService {

  constructor(
    // @InjectRepository(Entry) private readonly entryRepository: Repository<Entry>,
    @Inject('EntryRepository') private readonly entryRepository: typeof Entry,
    @Inject('SequelizeInstance') private readonly sequelizeInstance,
    private readonly databaseUtilitiesService: DatabaseUtilitiesService
  ) { }

  public async findAll(options?: object): Promise<Entry[]> {
    // Set a cache TTL of 10 seconds
    return await this.entryRepository.findAll<Entry>(options);
  }

  public async findById(id: number): Promise<Entry | null> {
    return this.entryRepository.findById<Entry>(id);
  }

  public async create(entry: IEntry): Promise<Entry> {
    return await this.sequelizeInstance.transaction(async transaction => {
      return await this.entryRepository.create<Entry>(entry, {
        returning: true,
        transaction,
      });
    });
  }

  public async update(id: number, newValue: IEntry): Promise<Entry | null> {
    return await this.sequelizeInstance.transaction(async transaction => {
      let entry = await this.entryRepository.findById<Entry>(id, { transaction });
      if (!entry) {
        throw new Error('The Entry was not found');
      }

      entry = this.databaseUtilitiesService.assign(entry, newValue);
      return await entry.save({
        returning: true,
        transaction,
      });
    });
  }

  public async delete(id: number): Promise<void> {
    return await this.sequelizeInstance.transaction(async transaction => {
      return await this.entryRepository.destroy({
        where: { id },
        transaction,
      });
    });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Entry } from './entry.entity';
import { Repository } from 'typeorm/index';

@Injectable()
export class EntryService {

  constructor(
    @InjectRepository(Entry) private readonly entryRepository: Repository<Entry>) {
  }

  findAll() {
    // Set a cache TTL of 10 seconds
    return this.entryRepository.find({ cache: 10000 });
  }

  findOneById(id: string) {
    return this.entryRepository.findOne(id, { relations: ['comments', 'metadata'] });
  }

  create(newEntry: Entry) {
    this.entryRepository.save(newEntry);
  }
}

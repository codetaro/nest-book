import { Module } from '@nestjs/common';
import { EntryService } from './entry.service';
import { EntryController } from './entry.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entry } from './entry.entity';
import { CommentModule } from '../comment/comment.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EntrySchema } from './schemas/entry.schema';
import { EntriesService } from './entries.service';
import { EntriesController } from './entries.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Entry]),
    MongooseModule.forFeature([{name: 'Entry', schema: EntrySchema}]),
    CommentModule,
  ],
  providers: [EntryService, EntriesService],
  controllers: [EntryController, EntriesController],
})
export class EntryModule {
}

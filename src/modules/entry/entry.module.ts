import { Module } from '@nestjs/common';
import { EntryService } from './entry.service';
import { EntryController } from './entry.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entry } from './entry.entity';
import { CommentModule } from '../comment/comment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Entry]),
    CommentModule,
  ],
  providers: [EntryService],
  controllers: [EntryController],
})
export class EntryModule {
}

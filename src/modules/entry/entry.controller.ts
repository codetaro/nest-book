import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EntryService } from './entry.service';
import { Entry } from './entry.entity';
import { Comment } from '../comment/comment.entity';
import { CommentService } from '../comment/comment.service';
import { EntryMetadata } from './entry_metadata.entity';

@Controller('entry')
export class EntryController {
  constructor(
    private readonly entryService: EntryService,
    private readonly commentService: CommentService) {
  }

  @Get()
  findAll() {
    return this.entryService.findAll();
  }

  @Get(':entryId')
  findOneById(@Param('entryId') entryId) {
    return this.entryService.findOneById(entryId);
  }

  @Post()
  async create(@Body() input: { entry: Entry, comments: Comment[], metadata: EntryMetadata }) {
    const { entry, comments, metadata } = input;
    entry.comments = comments;
    entry.metadata = metadata;
    return this.entryService.create(entry);
  }
}

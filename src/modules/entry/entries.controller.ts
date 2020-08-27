import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EntriesService } from './entries.service';

@Controller('entries')
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  @Get()
  findAll() {
    return this.entriesService.findAll();
  }

  @Get(':entryId')
  findById(@Param('entryId') entryId) {
    return this.entriesService.findById(entryId);
  }

  @Post()
  create(@Body() input) {
    return this.entriesService.create(input);
  }
}

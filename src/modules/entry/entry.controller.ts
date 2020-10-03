import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Req, Res } from '@nestjs/common';
import { EntryService } from './entry.service';
import { Entry } from './entry.entity';
import { CommentService } from '../comment/comment.service';
import { Request, Response } from 'express';

@Controller('entry')
export class EntryController {
  constructor(
    private readonly entryService: EntryService,
    private readonly commentService: CommentService) {
  }

  @Get()
  async index(@Req() req: Request, @Res() res: Response) {
    const entries: Entry[] = await this.entryService.findAll();
    return res.status(HttpStatus.OK).json(entries);
  }

  @Get(':entryId')
  async show(@Param('entryId') entryId) {
    const entry: Entry = await this.entryService.findOneById(entryId);
    return entry;
  }

  @Post()
  create(@Body() body: Entry) {
    if (Object.keys(body).length === 0) {
      throw new HttpException('Entry required', HttpStatus.BAD_REQUEST);
    }
    this.entryService.create(body);
  }
}

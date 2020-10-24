import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { EntryService } from './entry.service';
import { CommentService } from '../comment/comment.service';
import { CommandBus } from '@nestjs/cqrs';
import { IUser } from '../user/interfaces/IUser';
import { User } from '../../shared/decorators/user.decorator';
import { CreateEntryCommand } from './commands/impl/createEntry.command';
import { Entry } from '../../shared/decorators/entry.decorator';
import { IEntry } from './interfaces/IEntry';
import { UpdateEntryCommand } from './commands/impl/updateEntry.command';
import { DeleteEntryCommand } from './commands/impl/deleteEntry.command';

@Controller()
export class EntryController {
  constructor(
    private readonly entryService: EntryService,
    private readonly commentService: CommentService,
    private readonly commandBus: CommandBus,
  ) {
  }

  @Post('entry')
  public async create(@User() user: IUser, @Body() body: any, @Res() res) {
    if (!body || (body && Object.keys(body).length === 0)) {
      return res.status(HttpStatus.BAD_REQUEST).send('Missing some information.');
    }

    const error = await this.commandBus.execute(new CreateEntryCommand(
      body.title,
      body.content,
      body.keywords,
      user.id,
    ));

    if (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    } else {
      return res.status(HttpStatus.CREATED).send();
    }
  }

  @Get('entry')
  public async index(@User() user: IUser, @Res() res) {
    const entries = await this.entryService.findAll();
    return res.status(HttpStatus.OK).json(entries);
  }

  @Get('entry/:entryId')
  public async show(@User() user: IUser, @Entry() entry: IEntry, @Res() res) {
    return res.status(HttpStatus.OK).json(entry);
  }

  @Put('entry/:entryId')
  public async update(
    @User() user: IUser,
    @Entry() entry: IEntry,
    @Param('entryId') entryId: number,
    @Body() body: any,
    @Res() res) {
    if (user.id !== entry.userId) {
      return res.status(HttpStatus.NOT_FOUND).send('Unable to find the entry.');
    }

    const error = await this.commandBus.execute(new UpdateEntryCommand(
      entryId,
      body.title,
      body.content,
      body.keywords,
      user.id,
    ));

    if (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    } else {
      return res.status(HttpStatus.OK).send();
    }
  }

  @Delete('entry/:entryId')
  public async delete(
    @User() user: IUser, @Entry() entry: IEntry,
    @Param('entryId') entryId: number,
    @Body() body: any, @Res() res,
  ) {
    if (user.id !== entry.userId) {
      return res.status(HttpStatus.NOT_FOUND).send('Unable to find the entry.');
    }

    const error = await this.commandBus.execute(new DeleteEntryCommand(entryId));
    if (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    } else {
      return res.status(HttpStatus.OK).send();
    }
  }
}

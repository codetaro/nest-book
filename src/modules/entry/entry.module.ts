import { MiddlewareConsumer, Module, NestModule, OnModuleInit, RequestMethod } from '@nestjs/common';
import { EntryService } from './entry.service';
import { EntryController } from './entry.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entry } from './entry.entity';
import { CommentModule } from '../comment/comment.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EntrySchema } from './schemas/entry.schema';
import { EntriesService } from './entries.service';
import { EntriesController } from './entries.controller';
import { CommandBus, CQRSModule } from '@nestjs/cqrs';
import { entryProvider } from './entry.provider';
import { entryCommandHandlers } from './commands/handlers';
import { ModuleRef } from '@nestjs/core';
import { FetchEntryMiddleware } from '../../shared/middlewares/fetch-entry.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([Entry]),
    MongooseModule.forFeature([{ name: 'Entry', schema: EntrySchema }]),
    CommentModule,
    CQRSModule,
  ],
  controllers: [EntryController, EntriesController],
  providers: [entryProvider, EntryService, EntriesService, ...entryCommandHandlers],
  exports: [EntryService],
})
export class EntryModule implements NestModule, OnModuleInit {
  public constructor(
    private readonly moduleRef: ModuleRef,
    private readonly commandBus: CommandBus,
  ) {
  }

  public configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer
      .apply(FetchEntryMiddleware)
      .forRoutes(
        { path: 'entries/:entryId', method: RequestMethod.GET },
        { path: 'entries/:entryId', method: RequestMethod.PUT },
        { path: 'entries/:entryId', method: RequestMethod.DELETE },
      );
  }

  public onModuleInit(): any {
    this.commandBus.setModuleRef(this.moduleRef);
    this.commandBus.register(entryCommandHandlers);
  }
}

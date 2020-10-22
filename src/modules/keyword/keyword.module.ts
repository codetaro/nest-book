import { Module, OnModuleInit } from '@nestjs/common';
import { keywordProvider } from './keyword.provider';
import { keywordEntryProvider } from './keywordEntry.provider';
import { CommandBus, CQRSModule, EventBus } from '@nestjs/cqrs';
import { keywordEventHandlers } from './events/handlers';
import { ModuleRef } from '@nestjs/core';
import { KeywordService } from './keyword.service';
import { KeywordController } from './keyword.controller';
import { keywordCommandHandlers } from './commands/handlers';
import { KeywordSagas } from './keyword.sagas';

@Module({
  imports: [CQRSModule],
  controllers: [KeywordController],
  providers: [
    keywordProvider,
    keywordEntryProvider,
    ...keywordEventHandlers,
    KeywordService,
    ...keywordCommandHandlers,
    KeywordSagas
  ],
})
export class KeywordModule implements OnModuleInit {
  public constructor(
    private readonly moduleRef: ModuleRef,
    private readonly eventBus: EventBus,
    private readonly commandBus: CommandBus,
    private readonly keywordSagas: KeywordSagas
  ) { }

  public onModuleInit() {
/*
    // Set the module reference of event bus to the current module
    this.eventBus.setModuleRef(this.moduleRef);
    // Register all of the event handlers
    this.eventBus.register(keywordEventHandlers);
*/

    this.commandBus.setModuleRef(this.moduleRef);
    this.commandBus.register(keywordCommandHandlers);
    this.eventBus.setModuleRef(this.moduleRef);
    this.eventBus.combineSagas([
      this.keywordSagas.updateKeywordLinks.bind(this.keywordSagas)
    ]);
  }
}

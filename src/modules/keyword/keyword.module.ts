import { Module, OnModuleInit } from '@nestjs/common';
import { keywordProvider } from './keyword.provider';
import { keywordEntryProvider } from './keywordEntry.provider';
import { CQRSModule, EventBus } from '@nestjs/cqrs';
import { keywordEventHandlers } from './events/handlers';
import { ModuleRef } from '@nestjs/core';
import { KeywordService } from './keyword.service';
import { KeywordController } from './keyword.controller';

@Module({
  imports: [CQRSModule],
  providers: [
    keywordProvider,
    keywordEntryProvider,
    ...keywordEventHandlers,
    KeywordService,
  ],
  controllers: [KeywordController],
})
export class KeywordModule implements OnModuleInit {
  public constructor(
    private readonly moduleRef: ModuleRef,
    private readonly eventBus: EventBus
  ) { }

  public onModuleInit() {
    // Set the module reference of event bus to the current module
    this.eventBus.setModuleRef(this.moduleRef);
    // Register all of the event handlers
    this.eventBus.register(keywordEventHandlers);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { Keyword } from './keyword.entity';
import { Sequelize } from 'sequelize-typescript';
import { EventObservable } from '@nestjs/cqrs';
import { UpdateKeywordLinksEvent } from './events/impl/updateKeywordLinks.event';
import { mergeMap, switchMap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { Entry } from '../entry/sequelize/entry.entity';
import { UnlinkKeywordEntryCommand } from './commands/impl/unlinkKeywordEntry.command';
import { LinkKeywordEntryCommand } from './commands/impl/linkKeywordEntry.command';

@Injectable()
export class KeywordSagas {
  constructor(
    @Inject('KeywordRepository') private readonly keywordRepository: typeof Keyword,
    @Inject('SequelizeInstance') private readonly sequelizeInstance: Sequelize,
  ) {
  }

  public updateKeywordLinks(events$: EventObservable<any>) {
    return events$.ofType(UpdateKeywordLinksEvent).pipe(
      mergeMap(event =>
        this.compileKeywordLinkCommands(event)),
    );
  }

  // Retrieving the existing keyword blog entry links
  private compileKeywordLinkCommands(event: UpdateKeywordLinksEvent) {
    return from(this.keywordRepository.findAll({
      include: [{ model: Entry, where: { id: event.entryId } }],
    }))
      .pipe(
        switchMap(keywordEntities => of(
          ...this.getUnlinkCommands(event, keywordEntities),
          ...this.getLinkCommands(event, keywordEntities),
        )),
      );
  }

  private getUnlinkCommands(event: UpdateKeywordLinksEvent, keywordEntities: Keyword[]) {
    return keywordEntities
      .filter(keywordEntity => event.keywords.indexOf(keywordEntity.keyword) === -1)
      .map(keywordEntity => new UnlinkKeywordEntryCommand(keywordEntity.keyword, event.entryId));
  }

  private getLinkCommands(event: UpdateKeywordLinksEvent, keywordEntities: Keyword[]) {
    return event.keywords
      .filter(keyword =>
        keywordEntities.findIndex(keywordEntity =>
          keywordEntity.keyword === keyword) === -1)
      .map(keyword => new LinkKeywordEntryCommand(keyword, event.entryId));
  }
}

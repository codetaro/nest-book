import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UnlinkKeywordEntryCommand } from '../impl/unlinkKeywordEntry.command';
import { Inject } from '@nestjs/common';
import { Keyword } from '../../keyword.entity';
import { Sequelize } from 'sequelize-typescript';

@CommandHandler(UnlinkKeywordEntryCommand)
export class UnlinkKeywordEntryCommandHandler implements ICommandHandler<UnlinkKeywordEntryCommand> {

  constructor(
    @Inject('KeywordRepository') private readonly keywordRepository: typeof Keyword,
    @Inject('SequelizeInstance') private readonly sequelizeInstance: Sequelize,
  ) { }

  async execute(command: UnlinkKeywordEntryCommand, resolve: (error?: Error) => void) {
    let caught: Error;

    try {
      await this.sequelizeInstance.transaction(async transaction => {
        const keyword = await this.keywordRepository.findOrCreate<Keyword>({
          where: {
            keyword: command.keyword
          },
          transaction
        });

        await keyword[0].$remove('entries', command.entryId, { transaction });
      });
    } catch (error) {
      caught = error;
    } finally {
      resolve(caught);
    }
  }
}

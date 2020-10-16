import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { Entry } from '../../sequelize/entry.entity';
import { UpdateEntryCommand } from '../impl/updateEntry.command';
import { DatabaseUtilitiesService } from '../../../database/database-utilities.service';
import { EntryModel } from '../../sequelize/entry.model';

@CommandHandler(UpdateEntryCommand)
export class UpdateEntryCommandHandler implements ICommandHandler<UpdateEntryCommand> {
  constructor(
    @Inject('EntryRepository') private readonly EntryRepository: typeof Entry,
    @Inject('SequelizeInstance') private readonly sequelizeInstance,
    private readonly databaseUtilitiesService: DatabaseUtilitiesService,
    private readonly eventPublisher: EventPublisher
  ) {
  }

  async execute(command: UpdateEntryCommand, resolve: (error?: Error) => void) {
    let caught: Error;

    try {
      await this.sequelizeInstance.transaction(async transaction => {
        let entry = await this.EntryRepository.findById<Entry>(command.id, {
          transaction,
        });
        if (!entry) {
          throw new Error('The blog entry was not found.');
        }

        entry = this.databaseUtilitiesService.assign(entry, {
          ...command,
          id: undefined,
          keywords: JSON.stringify(command.keywords),
        });
        return await entry.save({
          returning: true,
          transaction,
        });
      });

      const entryModel = this.eventPublisher.mergeObjectContext(new EntryModel(command.id));
      entryModel.updateKeywordLinks(command.keywords);
      entryModel.commit();
    } catch (error) {
      caught = error;
    } finally {
      resolve(caught);
    }
  }
}

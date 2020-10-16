import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateEntryCommand } from '../impl/createEntry.command';
import { Entry } from '../../sequelize/entry.entity';
import { DeleteEntryCommand } from '../impl/deleteEntry.command';

@CommandHandler(DeleteEntryCommand)
export class DeleteEntryCommandHandler implements ICommandHandler<DeleteEntryCommand> {
  constructor(
    @Inject('EntryRepository') private readonly entryRepository: typeof Entry,
    @Inject('SequelizeInstance') private readonly sequelizeInstance
  ) { }

  async execute(command: DeleteEntryCommand, resolve: (error?: Error) => void) {
    let caught: Error;

    try {
      await this.sequelizeInstance.transaction(async transaction => {
        return await this.entryRepository.destroy({
          where: { id: command.id },
          transaction,
        });
      });
    } catch (error) {
      caught = error;
    } finally {
      resolve(caught);
    }
  }
}

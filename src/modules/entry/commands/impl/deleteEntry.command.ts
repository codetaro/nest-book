import { ICommand } from '@nestjs/cqrs';

export class DeleteEntryCommand implements ICommand {
  constructor(
    public readonly id: number
  ) {}
}

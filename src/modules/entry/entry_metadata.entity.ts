import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm/index';
import { Entry } from './entry.entity';

@Entity()
export class EntryMetadata {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column() likes: number;

  @Column() shortlink: string;

  @OneToOne(type => Entry, entry => entry.metadata)
  entry: Entry;
}

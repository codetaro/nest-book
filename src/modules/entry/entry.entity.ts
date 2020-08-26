import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm/index';
import { Comment } from '../comment/comment.entity';
import { EntryMetadata } from './entry_metadata.entity';
import { Versioning } from '../versioning.entity';

@Entity()
export class Entry {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column() title: string;

  @Column('text') body: string;

  @Column() image: string;

  @Column('simple-json') author: { first_name: string, last_name: string };

  @OneToOne(
    type => EntryMetadata, entryMetadata => entryMetadata.entry,
    { cascade: true })
  @JoinColumn()
  metadata: EntryMetadata;

  @OneToMany(
    type => Comment, comment => comment.entry,
    { cascade: true })
  comments: Comment[];

  @Column(type => Versioning)
  versioning: Versioning;
}

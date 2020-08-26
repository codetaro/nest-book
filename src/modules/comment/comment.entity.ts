import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm/index';
import { Entry } from '../entry/entry.entity';
import { Versioning } from '../versioning.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column('text') body: string;

  @Column('simple-json') author: { first_name: string, last_name: string };

  @ManyToOne(type => Entry, entry => entry.comments)
  entry: Entry;

  @Column(type => Versioning)
  versioning: Versioning;
}

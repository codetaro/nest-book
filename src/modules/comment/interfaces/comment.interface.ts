import { Document } from 'mongoose';
import { IEntry } from '../../entry/interfaces/entry.interface';

export interface Comment extends Document {
  readonly _id: string;
  readonly body: string;
  readonly created_at: Date;
  readonly entry: IEntry;
}

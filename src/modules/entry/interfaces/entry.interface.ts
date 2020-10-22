import { Document } from 'mongoose';
import { IComment } from '../../comment/interfaces/comment.interface';

export interface IEntry extends Document {
  readonly _id: string;
  readonly title: string;
  readonly body: string;
  readonly image: string;
  readonly created_at: Date;
  readonly comments: IComment[];
}

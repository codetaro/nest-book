import { Document } from 'mongoose';
import { Comment } from '../../comment/interfaces/comment.interface';

export interface Entry extends Document {
  readonly _id: string;
  readonly title: string;
  readonly body: string;
  readonly image: string;
  readonly created_at: Date;
  readonly comments: Comment[];
}

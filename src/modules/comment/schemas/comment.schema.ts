import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const CommentSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  body: String,
  created_at: Date,
  entry: { type: Schema.Types.ObjectId, ref: 'Entry' },
});

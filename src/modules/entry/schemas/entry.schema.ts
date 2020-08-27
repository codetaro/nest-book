import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const EntrySchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  body: String,
  image: String,
  created_at: Date,
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IEntry } from './interfaces/entry.interface';
import { Model, Types } from 'mongoose';
import { Comment } from '../comment/interfaces/comment.interface';

@Injectable()
export class EntriesService {
  constructor(
    @InjectModel('Entry') private readonly entryModel: Model<IEntry>,
    @InjectModel('Comment') private readonly commentModel: Model<Comment>,
  ) {
  }

  findAll() {
    return this.entryModel.find().exec();
  }

  // retrieve one entry by entry ID,
  // including its related documents with the "comments" reference
  findById(id: string) {
    return this.entryModel
      .findById(id)
      .populate('comments')
      .exec();
  }

  // this method saves an entry and a related comment in the database
  async create(input) {
    const { entry, comment } = input;

    // first take care of the entry (the owner of the relationship)
    entry._id = new Types.ObjectId();
    const createdEntry = new this.entryModel(entry);

    comment.entry = createdEntry._id;
    comment._id = new Types.ObjectId();
    const createdComment = new this.commentModel(comment);
    await createdComment.save();

    createdEntry.comments.push(createdComment);
    createdEntry.save();

    return { success: true };
  }
}

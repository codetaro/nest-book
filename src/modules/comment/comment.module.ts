import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from './schemas/comment.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }]),
  ],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {
}

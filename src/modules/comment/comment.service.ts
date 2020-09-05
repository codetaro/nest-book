import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm/index';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>,
  ) {
  }

  public async findAll(options?: object): Promise<Comment[]> {
    return await this.commentRepository.find(options);
  }

  public async findOne(options?: object): Promise<Comment | null> {
    return await this.commentRepository.findOne(options);
  }

  findOneById(id: string) {
    // return this.commentRepository.findOne(id);
    return getRepository(Comment)
      .createQueryBuilder('comment')
      .where('comment.id = :id', { id })
      .leftJoinAndSelect('comment.entry', 'entry')
      .getOne();
  }

  create(comment: Comment) {
    return this.commentRepository.save(comment);
  }
}

import { Module } from '@nestjs/common';
import { UserModule } from '../../modules/user/user.module';
import { CommentModule } from '../../modules/comment/comment.module';
import { CommentGateway } from './comment.gateway';

@Module({
  imports: [UserModule, CommentModule],
  providers: [CommentGateway],
})
export class CommentGatewayModule {}

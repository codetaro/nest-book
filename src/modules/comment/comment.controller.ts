import { Body, Controller, Headers, Param, Put, Query } from '@nestjs/common';
import { UpdateCommentRequest } from './requests/updateComment.request';

@Controller()
export class CommentController {
  @Put('comments/:commentId')
  public async update(
    @Body() body: UpdateCommentRequest,
    @Param('commentId') comment: string,
    @Query('testQuery') testQuery: string,
    @Headers('testHeader') testHeader: string
  ) {}
}

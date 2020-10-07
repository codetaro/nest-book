import { Body, Controller, Headers, Param, Put, Query } from '@nestjs/common';
import { UpdateCommentRequest } from './requests/updateComment.request';
import { UpdateCommentParams } from './requests/updateComment.params';
import { ApiBearerAuth, ApiConsumes, ApiImplicitParam, ApiOperation, ApiProduces, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { UpdateCommentQuery } from './requests/updateComment.query';
import { UpdateCommentHeaders } from './requests/updateComment.headers';
import { UpdateCommentResponse } from './requests/updateComment.response';

@Controller('entries/entryId')
@ApiResponse({
  status: 500,
  description: 'An unknown internal server error occurred'
})
export class CommentController {
  @Put('comments/:commentId')
  @ApiOperation({
    title: 'Comment Update',
    description: 'Updates a specific comment with new content',
    operationId: 'commentUpdate'
  })
  @ApiUseTags('comments')
  @ApiBearerAuth()
  @ApiConsumes('image/png')
  @ApiProduces('image/png')
  @ApiResponse({
    status: 200,
    description: 'The comment was successfully updated',
    type: UpdateCommentResponse
  })
  public async update(
    @Body() body: UpdateCommentRequest,
    @Param() param: UpdateCommentParams,
    @Query() query: UpdateCommentQuery,
    @Headers() headers: UpdateCommentHeaders
  ) {}
}

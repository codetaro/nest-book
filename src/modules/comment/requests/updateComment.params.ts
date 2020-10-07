import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateCommentParams {
  @ApiModelProperty()
  public entryId: string;

  @ApiModelProperty()
  public commentId: string;
}

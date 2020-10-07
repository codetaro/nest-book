import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class UpdateCommentQuery {
  @ApiModelPropertyOptional()
  public testQueryA: string;

  @ApiModelPropertyOptional()
  public testQueryB: string;
}

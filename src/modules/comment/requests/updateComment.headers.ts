import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class UpdateCommentHeaders {
  @ApiModelPropertyOptional()
  public testHeaderA: string;

  @ApiModelPropertyOptional()
  public testHeaderB: string;
}

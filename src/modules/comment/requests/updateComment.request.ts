import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class UpdateCommentRequest {
  // @IsNotEmpty()
  // @IsDefined()
  // @IsString()
  @ApiModelPropertyOptional()
  public body: string;
}

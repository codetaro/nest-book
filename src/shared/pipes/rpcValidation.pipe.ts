import { BadRequestException, Injectable, PipeTransform, ValidationPipe } from '@nestjs/common';
import { RpcValidationException } from '../exceptions/rpcValidation.exception';

@Injectable()
export class RpcValidationPipe extends ValidationPipe
  implements PipeTransform<any> {
  public async transform(value: any, metadata) {
    try {
      await super.transform(value, metadata);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new RpcValidationException();
      }

      throw error;
    }

    return value;
  }
}

import { Catch, RpcExceptionFilter } from '@nestjs/common';
import { RpcValidationException } from '../exceptions/rpcValidation.exception';
import { throwError } from 'rxjs';

@Catch(RpcValidationException)
export class RpcValidationFilter implements RpcExceptionFilter {
  public catch(exception: RpcValidationException) {
    return throwError({
      error_code: 'VALIDATION_FAILED',
      error_message: exception.getError(),
      errors: exception.validationErrors
    });
  }
}

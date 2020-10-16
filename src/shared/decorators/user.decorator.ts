import { createParamDecorator, PipeTransform } from '@nestjs/common';

export const User: (
  data?: any,
  ...pipes: Array<PipeTransform<any>>
) => ParameterDecorator = createParamDecorator((data, req) => {
  return req.user;
});

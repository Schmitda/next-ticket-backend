import { createParamDecorator, UnauthorizedException } from '@nestjs/common';

export interface CurrentUserOptions {
  required?: boolean
}

export const CurrentUser: (options?: CurrentUserOptions) => ParameterDecorator = createParamDecorator((opts: CurrentUserOptions = {}, req) => {
  const user = req.user;
  if (opts.required && !user) {
    throw new UnauthorizedException();
  }
  return user;
});

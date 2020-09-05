import { HttpStatus, Injectable, MiddlewareFunction, NestMiddleware } from '@nestjs/common';
import { UserService } from '../../modules/user/user.service';
import * as passport from 'passport';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {
  }

  async resolve(strategy: string): Promise<MiddlewareFunction> {
    return async (req, res, next) => {
      return passport.authenticate(strategy, async (...args: any[]) => {
        const [, payload, err] = args;
        if (err) {
          return res.status(HttpStatus.BAD_REQUEST)
            .send('Unable to authenticate the user.');
        }

        const user = await this.userService.findOne({
          where: { email: payload.email },
        });
        req.user = user;
        return next();
      })(req, res, next);
    };
  }
}

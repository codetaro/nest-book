import { Injectable, NestMiddleware } from '@nestjs/common';
import { UserService } from '../../modules/user/user.service';
import { WsException } from '@nestjs/websockets';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class WsAuthenticationGatewayMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {
  }

  resolve() {
    return (req, next) => {
      const matches = req.url.match(/token=([^&].*)/);
      req.token = matches && matches[1];

      if (!req.token) {
        throw new WsException('Missing token.');
      }

      return jwt.verify(
        req.token,
        'secret',
        async (err, payload) => {
          if (err) {
            throw new WsException(err);
          }

          const user = await this.userService.findOne({
            where: { email: payload.email },
          });
          req.user = user;
          return next(true);
        });
    };
  }
}

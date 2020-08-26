import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthenticationService } from '../authentication.service';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authenticationService: AuthenticationService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
      secretOrKey: 'secret',
    });
  }

  public async validate(req, payload, done) {
    const isValid = await this.authenticationService.validateUser(payload);
    if (!isValid) {
      return done('Unauthorized', null);
    } else {
      return done(null, payload);
    }
  }
}

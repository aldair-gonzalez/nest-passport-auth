import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { envs } from 'src/config';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: envs.session.google.clientID,
      clientSecret: envs.session.google.clientSecret,
      callbackURL: envs.session.google.callbackURL,
      passReqToCallback: true,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
    cb: VerifyCallback,
  ) {
    const { email, name, email_verified } = profile._json;
    const user = {
      email,
      name,
      email_verified,
      accessToken,
    };
    cb(null, user);
  }
}

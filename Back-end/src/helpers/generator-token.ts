import { sign } from 'jsonwebtoken';

export class JwtHelper {
  private secret: string;
  private expiresIn: string;

  constructor(secret: string, expiresIn = '15m') {
    this.secret = secret;
    this.expiresIn = expiresIn;
  }

  generateAccessToken(payload: object): string {
    return sign(payload, this.secret, { expiresIn: this.expiresIn });
  }
}
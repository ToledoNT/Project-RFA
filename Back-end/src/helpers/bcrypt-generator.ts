import bcrypt from "bcrypt";

export class BcryptPass {
  private static readonly SALT_ROUNDS: number = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;

  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  static async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
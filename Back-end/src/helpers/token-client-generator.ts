import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) throw new Error("JWT_SECRET não está definido no ambiente");

export class JwtHelper {
  static generateEmailToken(payload: object, expiresIn: string | number = "1h"): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { ...payload, type: "email_confirmation" },
        JWT_SECRET,
        { expiresIn },
        (err, token) => {
          if (err || !token) reject(err);
          else resolve(token);
        }
      );
    });
  }

  static verifyEmailToken(token: string): object {
    try {
      const payload = jwt.verify(token, JWT_SECRET) as { [key: string]: any };
      if (payload.type === "email_confirmation") {
        return payload;
      } else {
        throw new Error("Token inválido para confirmação de email");
      }
    } catch (error) {
      throw new Error("Token inválido ou expirado");
    }
  }

  static generateExpirationDate(minutes: number): string {
    return new Date(Date.now() + minutes * 60 * 1000).toISOString();
  }
}
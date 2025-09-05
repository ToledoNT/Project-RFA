import { Request, Response, NextFunction } from "express";
import { BcryptPass } from "../helpers/bcrypt-generator";
import { FieldsValidator } from "../helpers/fields-validator";
import { isValidEmail } from "../helpers/email-validator";
import jwt from "jsonwebtoken";

export class ClienteMiddleware {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const data = req.body;
    console.log(data);
    const isCreatingClient =
      req.method === "POST" && req.originalUrl === "/api/user/register";

    if (isCreatingClient) {
      // 🔹 Ajuste: normalizar confirmPass -> confirmPassword
      if (data.confirmPass && !data.confirmPassword) {
        data.confirmPassword = data.confirmPass;
        delete data.confirmPass;
      }

      const requiredFields: string[] = [
        "name",
        "lastname",
        "phone",
        "dateOfBirth",
        "zipcode",
        "street",
        "number",
        "neighborhood",
        "city",
        "state",
        "email",
        "password",
        "confirmPassword",
      ];

      const validationResult = new FieldsValidator().execute(data, requiredFields);
      if (!validationResult.status) {
        res.status(403).json(validationResult);
        return;
      }

      if (data.password !== data.confirmPassword) {
        res.status(400).json({ error: "As senhas não coincidem." });
        return;
      }

      try {
        const hashedPassword = await BcryptPass.hashPassword(data.password);
        req.body.password = hashedPassword;
        delete req.body.confirmPassword;
      } catch (error) {
        res.status(500).json({ error: "Erro ao criptografar a senha." });
        return;
      }
    }

    next();
  }
}

export class LoginMiddleware {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const data = req.body;

    const isLoginRoute = req.method === "POST" && req.originalUrl === "/api/user/login";

    if (isLoginRoute) {
      const requiredFields = ["email", "password"];

      for (const field of requiredFields) {
        if (!data[field]) {
          res.status(400).json({ message: `O campo ${field} é obrigatório.` });
          return;
        }
      }

      if (!isValidEmail(data.email)) {
        res.status(400).json({ message: "Formato de email inválido." });
        return;
      }

      if (typeof data.password !== "string" || data.password.length < 6) {
        res.status(400).json({ message: "A senha precisa ter ao menos 6 caracteres." });
        return;
      }
    }

    next();
  }
}

export class GetUsersMiddleware {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ message: "Token não fornecido." });
      return;
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Token mal formatado." });
      return;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      res.status(500).json({ message: "JWT_SECRET não configurado." });
      return;
    }

    try {
      const decoded = jwt.verify(token, secret);
      (req as any).user = decoded;
      next();
    } catch (error) {
      res.status(403).json({ message: "Token inválido ou expirado." });
    }
  }
}

export class EmailHeaderMiddleware {
  handle(req: Request, res: Response, next: NextFunction): void {
    const email = req.headers["x-user-email"];

    if (!email || typeof email !== "string") {
      res.status(400).json({ error: "E-mail não encontrado no header." });
      return;
    }

    req.body.email = email;
    next();
  }
}

export class DeleteUserMiddleware {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id, email } = req.body;

    if (!id && !email) {
      res.status(400).json({ error: "Você deve informar o ID ou o e-mail do usuário." });
      return;
    }

    next();
  }
}

export class AuthenticateTokenMiddleware {
  handle = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Token não fornecido." });
      return;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      res.status(500).json({ message: "JWT_SECRET não configurado." });
      return;
    }

    jwt.verify(token, secret, (err, user) => {
      if (err) {
        res.status(403).json({ message: "Token inválido ou expirado." });
        return;
      }
      (req as any).user = user;
      next();
    });
  };
}

export class ResetPasswordMiddleware {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, currentpassword, newpassword } = req.body;

    const isResetPass = req.method === "PUT" && req.originalUrl === "/api/user/resetpass";

    if (isResetPass) {
      if (
        typeof email !== "string" ||
        typeof currentpassword !== "string" ||
        typeof newpassword !== "string"
      ) {
        res.status(400).json({
          success: false,
          message:
            "Campos inválidos: email, currentpassword e newpassword devem ser strings.",
        });
        return;
      }

      if (!email.trim() || !currentpassword.trim() || !newpassword.trim()) {
        res.status(400).json({
          success: false,
          message: "Campos obrigatórios não podem ser vazios.",
        });
        return;
      }
    }

    next();
  }
}
import { Request, Response, NextFunction } from "express";
import { BcryptPass } from "../helpers/bcrypt-generator";
import { FieldsValidator } from "../helpers/fields-validator";
import { isValidEmail } from "../helpers/email-validator";

export class ClienteMiddleware {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const data = req.body;

    const isCreatingClient =
      req.method === "POST" && req.originalUrl === "/api/user/register";

    if (isCreatingClient) {
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
        res.status(403).send(validationResult);
        return;
      }

      if (data.password !== data.confirmPass) {
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
  //   const headerValited = new FieldsValidator().execute(req.headers, [
  //     "access-token",
  //   ]);
  //   if (!headerValited.status) {
  //     res.status(403).send(headerValited);
  //     return;
  //   }

  //   if (req.originalUrl.includes("/api/clientes/update")) {
  //     fields.push("email");
  //   }

  //   const fieldsValited = new FieldsValidator().execute(req.body, fields);
  //   if (!fieldsValited.status) {
  //     res.status(403).send(fieldsValited);
  //     return;
  //   }

  //   // Verifica o token
  //   const responseToken = await new ConsultToken().execute(req.headers);
  //   let permission: boolean = false;

  //   if (!responseToken.status) {
  //     res.status(401).send({
  //       status: false,
  //       code: 401,
  //       message: "Cliente não autorizado",
  //       data: [],
  //     });
  //     return;
  //   }

  //   if (responseToken.data?.[0]?.permission === "admin") {
  //     permission = true;
  //   }

  //   if (!permission) {
  //     res.status(401).send({
  //       status: false,
  //       code: 401,
  //       message: "Cliente não autorizado",
  //       data: [],
  //     });
  //     return;
  //   }

  //   next();
  // }


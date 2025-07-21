import { Request, Response } from "express";
import { CreateUser } from "../../use-cases/user/create-user-use-cases";
import { CreateUserModel } from "../../model/user/create-user-model";
import { JwtHelper } from "../../helpers/token-client-generator";

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;

      const emailToken = await JwtHelper.generateEmailToken({ email });
      const resetTokenExpiresAt = JwtHelper.generateExpirationDate(15);

      const userData = {
        ...req.body,
        resetToken: emailToken,
        resetTokenExpiresAt,
      };

      const createUserModel = new CreateUserModel(userData);
      const createdUser = await new CreateUser().execute(createUserModel);

      res.status(createdUser.code).send(createdUser);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      res.status(500).send({ message: "Erro interno no servidor" });
    }
  }
}
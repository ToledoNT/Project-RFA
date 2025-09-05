import { Request, Response } from "express";
import { CreateUser } from "../../use-cases/user/create-user-use-cases";
import { CreateUserModel } from "../../model/user/create-user-model";
import { JwtHelper } from "../../helpers/token-client-generator";

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<void> {
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
  }
}

import { Request, Response } from "express";
import { CreateUser } from "../../use-cases/user/create-user-use-cases";
import { CreateUserModel } from "../../model/user/create-user-model";
export class CreateUserController {
  async handle(req: Request, res: Response): Promise<void> {
    const createControllerFormated = new CreateUserModel(req.body);
    const createdCliente = await new CreateUser().execute(
      createControllerFormated
    );
    res.status(createdCliente.code).send(createdCliente);
    return;
  }
}
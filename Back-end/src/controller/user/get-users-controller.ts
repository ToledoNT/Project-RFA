import { Request, Response } from "express";
import { GetAllUsers } from "../../use-cases/user/get-users-use-cases";

export class GetAllUsersController {
  async handle(req: Request, res: Response): Promise<void> {
    const resultado = await new GetAllUsers().execute()
    res.status(resultado.code).send(resultado);
    return;
  }
}
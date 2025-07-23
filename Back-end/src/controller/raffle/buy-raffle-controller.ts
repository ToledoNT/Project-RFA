import { Request, Response } from "express";
import { GetAllUsers } from "../../use-cases/user/get-users-use-cases";
import { FindClientByEmail } from "../../use-cases/user/find-user-by-email";
import { FindRaffleById } from "../../use-cases/raffle/find-raffle-use-case";

export class BuyRaffleController {
  async handle(req: Request, res: Response): Promise<void> {
    const { id , email } = req.body;
    const fetchUser = await new FindClientByEmail().execute(email)
    if(!fetchUser) { 
      res.status(404).json({ erro: "Email de usuario não encontrado" });
      return;
    }
    const fetchRaflle =  await new FindRaffleById().execute(id)
    if(!fetchUser) { 
    res.status(404).json({ erro: "Rifa não encontrada"});
    return;
    }
  }
}
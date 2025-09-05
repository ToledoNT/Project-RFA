import { Request, Response } from "express";
import { FindClientByEmail } from "../../use-cases/user/find-user-by-email";
import { FindRaffleById } from "../../use-cases/raffle/find-raffle-use-case";
import { UpdateRaflle } from "../../use-cases/raffle/update.raffle-se-case";
import { RaffleStatus } from "@prisma/client";

export class BuyRaffleController {
  async handle(req: Request, res: Response): Promise<void> {
    const { id, email } = req.body;
    const fetchUser = await new FindClientByEmail().execute(email);
    if (!fetchUser?.status || !fetchUser.data?.[0]?.id) {
      res.status(404).json({ erro: "Usuário não encontrado pelo e-mail." });
      return;
    }
    const fetchRaffle = await new FindRaffleById().execute(id);
    if (!fetchRaffle?.status || !fetchRaffle.data?.id) {
      res.status(404).json({ erro: "Rifa não encontrada." });
      return;
    }
    if (fetchRaffle.data.status === "PURCHASED") {
      res.status(400).json({ erro: "Rifa já foi comprada." });
      return;
    }
    const date = new Date();
    const updateRaffle = await new UpdateRaflle().execute(fetchRaffle.data.id, {
      buyerId: fetchUser.data[0].id,
      status: RaffleStatus.PURCHASED,
      purchaseDate: date,
    });
    if (!updateRaffle?.status) {
      res.status(400).json({ erro: "Não foi possível atualizar a rifa." });
      return;
    }
    res.status(200).json(updateRaffle);
  }
}
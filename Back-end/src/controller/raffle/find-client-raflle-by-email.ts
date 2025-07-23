import { Request, Response } from "express";
import { FindClientByEmail } from "../../use-cases/user/find-user-by-email";
import { FetchAllRaffles } from "../../use-cases/raffle/fetch-all-raffles-use-case";
import { FetchRaffleModel } from "../../model/Raffle/fetch-raffle-model";

export class FindRaflleUserByEmailController {
  async handle(req: Request, res: Response): Promise<void> {
      const email = req.body.email;
      const findClientRaffle = await new FindClientByEmail().execute(email);
      const user = findClientRaffle.data?.[0];
      if (!user) {
        res.status(404).json({ success: false, message: "Usuário não encontrado." });
        return;
      }
      const userId = user.id;
      const allRaffles = await new FetchAllRaffles().execute();
      const raffles: FetchRaffleModel[] = allRaffles.data
        .filter((item: any) => item.buyerId === userId)
        .map((item: any) => new FetchRaffleModel(item));
      res.status(200).json({
        data: {
          raffles: raffles.map((r) => ({
            id: r.id,
            number: r.number,
            status: r.status,
          }))
        }
    });
  }
}
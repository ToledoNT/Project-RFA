import { Request, Response } from "express";
import { FetchRaffleModel } from "../../model/Raffle/fetch-raffle-model";
import { FetchAllRaffles } from "../../use-cases/raffle/fetch-all-raffles-use-case";

export class GetAllRafflesController {
  handle = async (req: Request, res: Response): Promise<void> => {
    const fetchAllRafflesUseCase = new FetchAllRaffles();
    const response = await fetchAllRafflesUseCase.execute();
    if (response && Array.isArray(response.data)) {
      const raffles = response.data.map((item: any) => new FetchRaffleModel(item));
      res.status(200).json({ success: true, data: raffles });
    }
  };
}
import { Request, Response } from "express";
import { CreateRaffleModel } from "../../model/Raffle/create-raffle-model";
import { CreateRaffle } from "../../use-cases/raffle/create-raffle-use-cases";
import { FetchAllRaffles } from "../../use-cases/raffle/fetch-raffle-use-cases";

export class CreateRaffleController {
  async handle(req: Request, res: Response): Promise<void> {
    const { number } = req.body;
    const createRaffleUseCase = new CreateRaffle();
    const fetchAllRaffles = new FetchAllRaffles();

    const existingResponse = await fetchAllRaffles.execute();
    const existingRaffles = existingResponse.data || [];

    const existingNumbers = new Set<number>(
      existingRaffles.map((raffle: any) => raffle.number)
    );

    const createdRaffles = [];
    let current = 1;

    while (createdRaffles.length < number) {
      if (!existingNumbers.has(current)) {
        const raffleData = new CreateRaffleModel({ number: current });
        const result = await createRaffleUseCase.execute(raffleData);
        createdRaffles.push(result);
      }
      current++;
    }

    res.status(201).json({ success: true, data: createdRaffles });
  }
}

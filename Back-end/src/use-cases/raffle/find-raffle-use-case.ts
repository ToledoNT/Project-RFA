import { CreateLog } from "../logs/create-log";
import { ResponseTemplateInterface } from "../../interfaces/response-template-interface";
import { PrismaRaffleRepository } from "../../db/prisma/repositories/prisma-raffle-repository";

export class FindRaffleById {
  async execute(id: string): Promise<ResponseTemplateInterface> {
    const response = await new PrismaRaffleRepository().findRaffleById(id);

    if (!response.status) {
      await new CreateLog().execute(response);
    }

    return response;
  }
}
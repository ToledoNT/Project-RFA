import { CreateLog } from "../logs/create-log";
import { ResponseTemplateInterface } from "../../interfaces/response-template-interface";
import { PrismaRaffleRepository } from "../../db/prisma/repositories/prisma-raffle-repository";
import { IupdateRaffle } from "../../interfaces/raffle/update-raffle-interface"; // certifique-se de importar a interface correta

export class UpdateRaflle {
    async execute(id: string, data: Partial<IupdateRaffle>): Promise<ResponseTemplateInterface> {
      const response = await new PrismaRaffleRepository().updateRaffleById(id, data);
  
      if (!response.status) {
        await new CreateLog().execute(response);
      }
  
      return response;
    }
  }
  
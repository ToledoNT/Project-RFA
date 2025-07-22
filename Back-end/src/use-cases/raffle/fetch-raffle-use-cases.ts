import { CreateLog } from "../logs/create-log"; 
import { ResponseTemplateInterface } from "../../interfaces/response-template-interface";
import { PrismaRaffleRepository } from "../../db/prisma/repositories/prisma-raffle-repository";
export class FetchAllRaffles {
  async execute(): Promise<ResponseTemplateInterface> {
    const responseCreate = await new PrismaRaffleRepository().getAllRaffles()
    if (!responseCreate.status) {
      await new CreateLog().execute(responseCreate);
    }
    return responseCreate;
  }
}
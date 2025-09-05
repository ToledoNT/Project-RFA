import { ICreateUser } from "../../interfaces/user/create-user-interface";
import { CreateLog } from "../logs/create-log"; 
import { ResponseTemplateInterface } from "../../interfaces/response-template-interface";
import { ICreateRaffle } from "../../interfaces/raffle/create-raffle-interface";
import { PrismaRaffleRepository } from "../../db/prisma/repositories/prisma-raffle-repository";
export class CreateRaffle {
  async execute(numbersrfa: ICreateRaffle): Promise<ResponseTemplateInterface> {
    const responseCreate = await new PrismaRaffleRepository().create(numbersrfa)
    if (!responseCreate.status) {
      await new CreateLog().execute(responseCreate);
    }
    return responseCreate;
  }
}
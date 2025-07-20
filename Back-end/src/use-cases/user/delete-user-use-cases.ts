import { CreateLog } from "../logs/create-log"; 
import { ResponseTemplateInterface } from "../../interfaces/response-template-interface"; 
import { PrismaUserRepository } from "../../db/prisma/repositories/prisma-cliente-repository"; 

export class DeleteUser {
  async execute(id: string): Promise<ResponseTemplateInterface> {
    const responseCreate = await new PrismaUserRepository().delete(id)
    if (!responseCreate.status) {
      await new CreateLog().execute(responseCreate);
    }
    return responseCreate;
  }
}
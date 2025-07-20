import { CreateLog } from "../logs/create-log"; 
import { PrismaUserRepository } from "../../db/prisma/repositories/prisma-cliente-repository"; 
import { ResponseTemplateInterface } from "../../interfaces/response-template-interface";

export class GetAllUsers {
  async execute(): Promise<ResponseTemplateInterface> {
    const response = await new PrismaUserRepository().getAll();
    if (!response.status) {
      await new CreateLog().execute(response);
    }
    return response;
  }
}
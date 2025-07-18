import { CreateLog } from "../logs/create-log"; 
import { ResponseTemplateInterface } from "../../interfaces/responses/response-templete-interface";
import { PrismaUserRepository } from "../../db/prisma/repositories/prisma-user-repositories";

export class GetAllUsers {
  async execute(): Promise<ResponseTemplateInterface> {
    const response = await new PrismaUserRepository().getAll();
    if (!response.status) {
      await new CreateLog().execute(response);
    }
    return response;
  }
}
import { ICreateUser } from "../../interfaces/user/create-user-interface";
import { CreateLog } from "../logs/create-log"; 
import { ResponseTemplateInterface } from "../../interfaces/response-template-interface";
import { PrismaUserRepository } from "../../db/prisma/repositories/prisma-cliente-repository"; 
export class CreateUser {
  async execute(user: ICreateUser): Promise<ResponseTemplateInterface> {
    const responseCreate = await new PrismaUserRepository().create(user)
    if (!responseCreate.status) {
      await new CreateLog().execute(responseCreate);
    }
    return responseCreate;
  }
}
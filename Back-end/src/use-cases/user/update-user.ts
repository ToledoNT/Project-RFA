import { PrismaUserRepository } from "../../db/prisma/repositories/prisma-user-repositories";
import { ResponseTemplateInterface } from "../../interfaces/responses/response-templete-interface";
import { IUpdateUser } from "../../interfaces/user/update-user-interface";
import { CreateLog } from "../logs/create-log";

export class UpdateUser {
  async execute(user: IUpdateUser): Promise<ResponseTemplateInterface> {
    const { id, ...data } = user;  
    const responseCreate = await new PrismaUserRepository().update(id, data);
    if (!responseCreate.status) {
      await new CreateLog().execute(responseCreate);
    }
    return responseCreate;
  }
}
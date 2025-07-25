import { PrismaUserRepository } from "../../db/prisma/repositories/prisma-cliente-repository";
import { ResponseTemplateInterface } from "../../interfaces/response-template-interface";
import { IUpdateUser } from "../../interfaces/user/update-user-interface";
import { CreateLog } from "../logs/create-log";

export class UpdateUser {
  async execute(user: IUpdateUser): Promise<ResponseTemplateInterface> {
    const { id, ...data } = user;
    if (!id) throw new Error("ID do usuário é obrigatório para atualização");
    const responseCreate = await new PrismaUserRepository().update(id, data);
    if (!responseCreate.status) {
      await new CreateLog().execute(responseCreate);
    }
    return responseCreate;
  }
}
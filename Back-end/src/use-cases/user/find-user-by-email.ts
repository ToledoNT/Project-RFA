import { PrismaUserRepository } from "../../db/prisma/repositories/prisma-user-repositories";
import { IResponseCliente } from "../../interfaces/responses/response-client-interface";
import { ResponseClienteModel } from "../../model/response/response-cliente-model";
import { CreateLog } from "../logs/create-log";

export class FindClientByEmail {
  async execute(email: string): Promise<IResponseCliente> {
    const response = await new PrismaUserRepository().findByEmail(email);
    if (!response.status) {
      await new CreateLog().execute(response);
    }
    return new ResponseClienteModel(response);
  }
}
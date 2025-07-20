import { PrismaUserRepository } from "../../db/prisma/repositories/prisma-cliente-repository"; 
import { IResponseCliente } from "../../interfaces/responses/response-cliente-interface";
import { ResponseClienteModel } from "../../model/responses/response-cliente-model";
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
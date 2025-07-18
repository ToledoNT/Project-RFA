import { PrismaUserRepository } from "../../db/prisma/repositories/prisma-user-repositories"; 
import { IResponseCliente } from "../../interfaces/responses/response-client-interface"; 
import { ResponseClienteModel } from "../../model/response/response-cliente-model"; 
import { CreateLog } from "../logs/create-log";

export class FetchCliente {
  async execute(criteria: any): Promise<IResponseCliente> {
    const response = await new PrismaUserRepository().find(criteria);
    if (!response.status) {
      await new CreateLog().execute(response);
    }
    return new ResponseClienteModel(response);
  }
}
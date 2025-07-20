import { PrismaUserRepository } from "../../db/prisma/repositories/prisma-cliente-repository"; 
import { IResponseCliente } from "../../interfaces/responses/response-cliente-interface";
import { ResponseClienteModel } from "../../model/responses/response-cliente-model";
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
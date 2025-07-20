import { PrismaUserRepository } from "../db/prisma/repositories/prisma-cliente-repository";
import { ResponseTemplateInterface } from "../interfaces/response-template-interface";
import { IResponseCliente } from "../interfaces/responses/response-cliente-interface"; 
import { ResponseClienteModel } from "../model/responses/response-cliente-model";
import { CreateLog } from "./logs/create-log";

export class ConsultToken {
  async execute(value: any): Promise<ResponseTemplateInterface> {
    let response: ResponseTemplateInterface = new ResponseClienteModel({
      status: false,
      code: 500,
      message: "Parametro de consulta de token não encontradonão encontrado",
      data: [],
    });
    if (value?.["access-token"] != undefined) {
      response = await new PrismaUserRepository().findByToken(
        value?.["access-token"]
      );
    }
    if (!response.status) {
      await new CreateLog().execute(response);
    }
    return response;
  }
}
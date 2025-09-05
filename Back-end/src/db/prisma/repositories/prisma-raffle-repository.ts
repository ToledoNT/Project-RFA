import { ICreateRaffle } from "../../../interfaces/raffle/create-raffle-interface";
import { IupdateRaffle } from "../../../interfaces/raffle/update-raffle-interface";
import { ResponseTemplateInterface } from "../../../interfaces/response-template-interface";
import { ResponseTemplateModel } from "../../../model/response-template-model";
import { prisma } from "../../prisma-connection";

export class PrismaRaffleRepository {
  async create(data: ICreateRaffle): Promise<ResponseTemplateInterface> {
    try {
      const response = await prisma.raffle.create({ data });
      return new ResponseTemplateModel(true, 201, "Rifa criada com sucesso", response);
    } catch (error) {
      console.error("Erro ao criar rifa:", error);
      return new ResponseTemplateModel(false, 500, "Erro ao criar rifa", []);
    }
  }

  async getAllRaffles(): Promise<ResponseTemplateInterface> {
    try {
      const response = await prisma.raffle.findMany({});
      return new ResponseTemplateModel(true, 200, "Rifas consultadas com sucesso", response);
    } catch (error) {
      console.error("Erro ao consultar rifas:", error);
      return new ResponseTemplateModel(false, 500, "Erro ao consultar rifas", error);
    }
  }

  async findRaffleById(id: string): Promise<ResponseTemplateInterface> {
    try {
      const response = await prisma.raffle.findUnique({
        where: { id },
        include: { buyer: true }, // traz os dados do comprador junto
      });

      if (!response) {
        return new ResponseTemplateModel(false, 404, "Rifa não encontrada", null);
      }

      return new ResponseTemplateModel(true, 200, "Rifa consultada com sucesso", response);
    } catch (error) {
      console.error("Erro ao consultar rifa:", error);
      return new ResponseTemplateModel(false, 500, "Erro ao consultar rifa", error);
    }
  }

  async updateRaffleById(id: string, data: Partial<IupdateRaffle>): Promise<ResponseTemplateInterface> {
    try {
      const response = await prisma.raffle.update({
        where: { id },
        data,
        include: { buyer: true }, 
      });
      return new ResponseTemplateModel(true, 200, "Rifa atualizada com sucesso", response);
    } catch (error: any) {
      if (error.code === "P2025") {
        return new ResponseTemplateModel(false, 404, "Rifa não encontrada", null);
      }
      console.error("Erro ao atualizar rifa:", error);
      return new ResponseTemplateModel(false, 500, "Erro ao atualizar rifa", error);
    }
  }
}  
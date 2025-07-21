import { ICreateUser } from "../../../interfaces/user/create-user-interface"; 
import { IUpdateUser } from "../../../interfaces/user/update-user-interface"; 
import { ResponseTemplateInterface } from "../../../interfaces/response-template-interface";
import { ResponseTemplateModel } from "../../../model/response-template-model";
import { prisma } from "../../prisma-connection"; 

export class PrismaUserRepository {
  async create(data: ICreateUser): Promise<ResponseTemplateInterface> {
    try {
      const response = await prisma.user.create({
        data,
      });
      return new ResponseTemplateModel(
        true,
        201,
        "Cliente criado com sucesso",
        response
      );
    } catch (error) {
      console.error("Erro ao criar cliente:", error);  // <-- aqui imprime o erro
      return new ResponseTemplateModel(false, 500, "Erro ao criar cliente", []);
    }
  }
  
  async delete(id: string): Promise<ResponseTemplateInterface> {
    try {
      await prisma.user.delete({ where: { id } });
      return new ResponseTemplateModel(
        true,
        200,
        "Cliente deletado com sucesso",
        null
      );
    } catch (error) {
      return new ResponseTemplateModel(false, 500, "Erro ao deletar cliente", []);
    }
  }

  // async findById(value: string): Promise<ResponseTemplateInterface> {
  //   try {
  //     const response = await prisma.user.findMany({
  //       where: {
  //         : value,
  //       },
  //     });
  //     return new ResponseTemplateModel(
  //       true,
  //       200,
  //       "Cliente encontrado com sucesso",
  //       response
  //     );
  //   } catch (error) {
  //     return new ResponseTemplateModel(
  //       false,
  //       500,
  //       "Erro ao consultar cliente",
  //       error
  //     );
  //   }
  // }

  async findByToken(acessToken: string): Promise<ResponseTemplateInterface> {
    try {
      const response = await prisma.user.findMany({
        where: {
          acesstokenApi: acessToken,
        },
      });
      if (!response || response.length === 0) {
        throw new Error("Cliente não cadastrado na base");
      }
      return new ResponseTemplateModel(
        true,
        200,
        "Cliente encontrado com sucesso",
        response
      );
    } catch (error) {
      return new ResponseTemplateModel(
        false,
        401,
        "Cliente não cadastrado na base",
        error
      );
    }
  }

  async getAll(): Promise<ResponseTemplateInterface> {
    try {
      const response = await prisma.user.findMany({});
      return new ResponseTemplateModel(
        true,
        200,
        "Clientes consultados com sucesso",
        response
      );
    } catch (error) {
      return new ResponseTemplateModel(
        false,
        401,
        "Erro ao consultar clientes",
        error
      );
    }
  }

  async update(
    userId: string,
    value: IUpdateUser
  ): Promise<ResponseTemplateInterface> {
    try {
      const response = await prisma.user.update({
        where: { email: userId },
        data: value,
      });
      return new ResponseTemplateModel(
        true,
        200,
        "Cliente atualizado com sucesso",
        response
      );
    } catch (error) {
      return new ResponseTemplateModel(
        false,
        401,
        "Erro ao atualizar cliente",
        error
      );
    }
  }

  async findByEmail(email: string): Promise<ResponseTemplateInterface> {
    try {
      const response = await prisma.user.findUnique({
        where: { email },
      });
      if (!response) {
        throw new Error("Cliente não encontrado na base");
      }
      return new ResponseTemplateModel(
        true,
        200,
        "Cliente encontrado com sucesso",
        response
      );
    } catch (error) {
      return new ResponseTemplateModel(
        false,
        401,
        "Cliente não encontrado na base",
        error
      );
    }
  }

  async find(criteria: any): Promise<ResponseTemplateInterface> {
    try {
      const response = await prisma.user.findMany({
        where: criteria,
      });
      if (!response || response.length === 0) {
        throw new Error("Clientes não encontrados na base");
      }
      return new ResponseTemplateModel(
        true,
        200,
        "Clientes encontrados com sucesso",
        response
      );
    } catch (error) {
      return new ResponseTemplateModel(
        false,
        401,
        "Clientes não encontrados na base",
        error
      );
    }
  }
}
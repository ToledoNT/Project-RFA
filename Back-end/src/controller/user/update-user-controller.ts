import { Request, Response } from "express";
import { FetchClienteModel } from "../../model/user/fetch-cliente-model";
import { UpdateClienteModel } from "../../model/user/update-cliente-model";
import { FindClientByEmail } from "../../use-cases/user/find-user-by-email";
import { UpdateUser } from "../../use-cases/user/update-user";
import { IUpdateUser } from "../../interfaces/user/update-user-interface";

export class UpdateClienteController {
  async handle(req: Request, res: Response): Promise<void> {
    const email = req.body?.email;
    if (!email) {
      res.status(400).json({ erro: "E-mail é obrigatório" });
      return;
    }
    const resultadoClienteAntigo = await new FindClientByEmail().execute(email);
    if (!resultadoClienteAntigo || !resultadoClienteAntigo.data || resultadoClienteAntigo.data.length === 0) {
      res.status(404).json({ erro: "Cliente não encontrado" });
      return;
    }
    const dadosAntigosCliente = resultadoClienteAntigo.data[0];
    const clienteAntigo = new FetchClienteModel(dadosAntigosCliente);
    const clienteFormatado = new UpdateClienteModel(req.body, clienteAntigo);
    const id = dadosAntigosCliente.id;
    if (!clienteFormatado.name || !clienteFormatado.email) {
      res.status(400).json({ erro: "Nome e e-mail são obrigatórios" });
      return;
    }
    const dadosParaAtualizar: IUpdateUser = {
      id,
      name: clienteFormatado.name ?? "",
      lastname: clienteFormatado.lastname ?? "",
      phone: clienteFormatado.phone ?? "",
      dateOfBirth: clienteFormatado.dateOfBirth ?? "",
      zipcode: clienteFormatado.zipcode ?? "",
      street: clienteFormatado.street ?? "",
      number: clienteFormatado.number ?? "",
      neighborhood: clienteFormatado.neighborhood ?? "",
      city: clienteFormatado.city ?? "",
      state: clienteFormatado.state ?? "",
      email: clienteFormatado.email ?? "",
      password: clienteFormatado.password ?? "",
    };
    const updateUser = await new UpdateUser().execute(dadosParaAtualizar);
    if (updateUser) {
      res.status(200).json({ mensagem: "Cliente atualizado com sucesso", dados: updateUser });
    } if(!updateUser) {
      res.status(500).json({ erro: "Erro ao atualizar cliente" });
    }
  }
}
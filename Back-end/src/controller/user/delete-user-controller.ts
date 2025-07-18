import { Request, Response } from "express";
import { FindClientByEmail } from "../../use-cases/user/find-user-by-email";
import { DeleteUser } from "../../use-cases/user/delete-user-use-cases";

export class DeleteUserController {
  async handle(req: Request, res: Response): Promise<void> {
    const { id, email } = req.body;
    if (id) {
      const deleteUser = await new DeleteUser().execute(id);
      if (deleteUser && deleteUser.status !== false) {
        res.status(200).json({ mensagem: "Usuário deletado com sucesso via ID", dados: deleteUser });
        return;
      }
      res.status(500).json({ erro: "Erro ao deletar usuário pelo ID", detalhes: deleteUser });
      return;
    }
    if (!email) {
      res.status(400).json({ erro: "Você deve informar um e-mail ou um ID" });
      return;
    }
    const resultadoClienteAntigo = await new FindClientByEmail().execute(email);
    if (
      !resultadoClienteAntigo ||
      !resultadoClienteAntigo.data ||
      resultadoClienteAntigo.data.length === 0
    ) {
      res.status(404).json({ erro: "Cliente não encontrado com o e-mail informado" });
      return;
    }
    const userId = resultadoClienteAntigo.data[0].id;
    const deleteUser = await new DeleteUser().execute(userId);
    if (deleteUser && deleteUser.status !== false) {
      res.status(200).json({ mensagem: "Usuário deletado com sucesso via e-mail", dados: deleteUser });
      return;
    }
    res.status(500).json({ erro: "Erro ao deletar usuário", detalhes: deleteUser });
  }
}
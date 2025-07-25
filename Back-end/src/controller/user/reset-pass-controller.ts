import { Request, Response } from "express";
import { FetchUser } from "../../use-cases/user/fetch-user";
import { BcryptPass } from "../../helpers/bcrypt-generator";
import { UpdateUser } from "../../use-cases/user/update-user";

export class ResetPassUserController {
    async handle(req: Request, res: Response): Promise<void> {
        const { currentpassword, newpassword, email } = req.body;
        if (!email || !currentpassword || !newpassword) {
          res.status(400).json({ message: "Email, senha atual e nova senha são obrigatórios" });
          return;
        }
        const fetchUser = new FetchUser();
        const response = await fetchUser.execute(email);
        if (!response.status || !response.data || response.data.length === 0) {
          res.status(401).json({ message: "Usuário não encontrado" });
          return;
        }
        const user = response.data[0];
        const isPasswordValid = await BcryptPass.comparePassword(currentpassword, user.password);
        if (!isPasswordValid) {
          res.status(401).json({ message: "Senha atual incorreta" });
          return;
        }
        const hashedPassword = await BcryptPass.hashPassword(newpassword);
        const updateUser = new UpdateUser();
        const updated = await updateUser.execute({
          id: user.id,
          password: hashedPassword,
        });
  
        if (!updated.status) {
          res.status(500).json({ message: "Erro ao atualizar a senha", error: updated.message });
          return;
        }
        res.status(200).json({ message: "Senha atualizada com sucesso" });
      } 
    }
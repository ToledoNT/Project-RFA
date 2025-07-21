import { Request, Response } from "express";
import { FetchUser } from "../../use-cases/user/fetch-user";
import { BcryptPass } from "../../helpers/bcrypt-generator";

export class LoginUserController {
  async handle(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email e senha são obrigatórios" });
      return;
    }
    const fetchUser = new FetchUser();
    const response = await fetchUser.execute(email);
    if (!response.status || !response.data || response.data.length === 0) {
      res.status(401).json({ message: "Usuário não encontrado" });
      return;
    }
    const user = response.data[0];
    if (user.isEmailConfirmed === false) {
      res.status(403).json({ message: "Confirme seu e-mail antes de fazer login." });
      return;
    }
    const isPasswordValid = await BcryptPass.comparePassword(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Senha incorreta" });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Login efetuado com sucesso",
      user: {
        email: user.email,
        isEmailConfirmed: user.isEmailConfirmed,
        name: user.name,
        lastname: user.lastname,
      }
    });
    }
  }
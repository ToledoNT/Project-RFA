import { Request, Response, NextFunction } from "express";

export class CreateRaffleMiddleware {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { number } = req.body;

    if (number === undefined) {
      res.status(400).json({ erro: "O campo 'number' é obrigatório." });
      return;
    }

    if (typeof number !== "number" || number <= 0 || !Number.isInteger(number)) {
      res.status(400).json({ erro: "O campo 'number' deve ser um número inteiro positivo." });
      return;
    }

    next();
  }
}


export class GetAllRafflesAvailableMiddleware {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    next();
  }
}

export class BuyRaffleMiddleware {
    async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
      const { id, email } = req.body;
  
      if (!id) {
        res.status(400).json({ erro: "O campo 'id' da rifa é obrigatório." });
        return;
      }
  
      if (!email) {
        res.status(400).json({ erro: "O campo 'email' do usuário é obrigatório." });
        return;
      }
  
    
      next();
    }
  }

export class FindRaffleUserByEmailMiddleware {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ success: false, message: "O campo 'email' é obrigatório." });
      return;
    }

    if (typeof email !== "string" || !email.includes("@")) {
      res.status(400).json({ success: false, message: "Formato de email inválido." });
      return;
    }

    next();
  }
}
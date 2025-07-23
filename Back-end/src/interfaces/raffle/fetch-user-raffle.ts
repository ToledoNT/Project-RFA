import { RaffleStatus } from "@prisma/client"; // ou defina manualmente se não estiver usando o client aqui
import { IFetchCliente } from "../user/fetch-user-interface";

export interface IFetchRaffle {
  id: string;
  number: number;
  status: RaffleStatus;
  buyerId?: string | null;
  buyer?: IFetchCliente | null;  
  purchaseDate?: Date | null;
}
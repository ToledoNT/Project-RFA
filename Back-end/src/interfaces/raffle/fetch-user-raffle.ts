import { RaffleStatus } from "@prisma/client";
import { IFetchCliente } from "../user/fetch-user-interface";

export interface IFetchRaffle {
  id: string;
  number: number;
  status: RaffleStatus;
  buyerId?: string | null;
  buyer?: IFetchCliente | null;  
  purchaseDate?: Date | null;
}
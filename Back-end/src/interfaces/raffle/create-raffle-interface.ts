import { RaffleStatus } from "@prisma/client";
import { IFetchCliente } from "../../interfaces/user/fetch-user-interface";

export interface ICreateRaffle {
  number: number;
  status?: RaffleStatus;
  buyerId?: string; 
  purchaseDate?: Date;
}

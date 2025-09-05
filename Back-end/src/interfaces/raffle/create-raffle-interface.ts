import { RaffleStatus } from "@prisma/client";

export interface ICreateRaffle {
  number: number;
  status?: RaffleStatus;
  buyerId?: string; 
  purchaseDate?: Date;
}
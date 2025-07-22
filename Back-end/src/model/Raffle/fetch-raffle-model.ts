import { RaffleStatus } from "@prisma/client";
import { IFetchCliente } from "../../interfaces/user/fetch-user-interface";

export class CreateRaffleModel {
  id: string;
  number: number;
  status: RaffleStatus;
  buyerId?: string | null;
  buyer?: IFetchCliente | null;
  purchaseDate?: Date | null;

  constructor(data: Partial<CreateRaffleModel>) {
    this.id = data.id ?? '';
    this.number = data.number ?? 0;
    this.status = data.status ?? RaffleStatus.AVAILABLE;
    this.buyerId = data.buyerId ?? null;
    this.buyer = data.buyer ?? null;

    if (data.purchaseDate) {
      this.purchaseDate = new Date(data.purchaseDate);
      if (isNaN(this.purchaseDate.getTime())) {
        this.purchaseDate = null;
      }
    } else {
      this.purchaseDate = null;
    }
  }
}
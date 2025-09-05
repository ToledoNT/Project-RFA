import { RaffleStatus } from "@prisma/client";
import { IFetchCliente } from "../../interfaces/user/fetch-user-interface";

export class FetchRaffleModel {
  id?: string;
  number: number;
  status: RaffleStatus;
  buyerId?: string;
  buyer?: IFetchCliente;
  purchaseDate?: Date;

  constructor(data: Partial<FetchRaffleModel>) {
    if (data.id) {
      this.id = data.id;
    }
    this.number = data.number ?? 0;
    this.status = data.status ?? RaffleStatus.AVAILABLE;

    if (data.buyerId !== null && data.buyerId !== undefined) {
      this.buyerId = data.buyerId;
    }

    if (data.buyer !== null && data.buyer !== undefined) {
      this.buyer = data.buyer;
    }

    if (data.purchaseDate) {
      const parsedDate = new Date(data.purchaseDate);
      this.purchaseDate = isNaN(parsedDate.getTime()) ? undefined : parsedDate;
    }
  }
}
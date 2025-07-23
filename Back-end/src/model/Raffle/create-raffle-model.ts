import { RaffleStatus } from "@prisma/client";
import { IFetchCliente } from "../../interfaces/user/fetch-user-interface";

export class CreateRaffleModel {
  number: number;
  status: RaffleStatus;
  buyerId?: string;
  buyer?: IFetchCliente;
  purchaseDate?: Date;

  constructor(data: Partial<CreateRaffleModel>) {
    this.number = data.number ?? 0;
    this.status = data.status ?? RaffleStatus.AVAILABLE;

    if (data.buyerId !== null) {
      this.buyerId = data.buyerId;
    }

    if (data.buyer !== null) {
      this.buyer = data.buyer;
    }

    if (data.purchaseDate) {
      const parsedDate = new Date(data.purchaseDate);
      this.purchaseDate = isNaN(parsedDate.getTime()) ? undefined : parsedDate;
    }
  }
}
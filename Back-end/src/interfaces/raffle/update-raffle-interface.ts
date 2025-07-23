import { RaffleStatus } from "@prisma/client";

export interface IupdateRaffle {
    number?: number;
    status?: RaffleStatus;
    buyerId?: string;
    
    purchaseDate?: Date;
} 
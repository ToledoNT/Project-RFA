import { IFetchCliente } from "../user/fetch-user-interface";

export interface IResponseCliente {
  status: boolean;
  code: number;
  message: string;
  data: Array<IFetchCliente>;
}
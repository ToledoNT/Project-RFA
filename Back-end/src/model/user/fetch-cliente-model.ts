import { IFetchCliente } from "../../interfaces/user/fetch-user-interface";

export class FetchClienteModel implements IFetchCliente {
  id: string;
  name: string;
  lastname: string;
  phone: string;
  dateOfBirth: string;
  zipcode: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  email: string;
  isEmailConfirmed: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(value: IFetchCliente) {
    this.id = value.id ?? "";
    this.name = value.name ?? "";
    this.lastname = value.lastname ?? "";
    this.phone = value.phone ?? "";
    this.dateOfBirth = value.dateOfBirth ?? "";
    this.zipcode = value.zipcode ?? "";
    this.street = value.street ?? "";
    this.number = value.number ?? "";
    this.neighborhood = value.neighborhood ?? "";
    this.city = value.city ?? "";
    this.state = value.state ?? "";
    this.email = value.email ?? "";
    this.isEmailConfirmed = value.isEmailConfirmed ?? false;
    this.createdAt = value.createdAt ?? new Date();
    this.updatedAt = value.updatedAt ?? new Date();
  }
}

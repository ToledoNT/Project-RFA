import { ICreateUser } from "../../interfaces/user/create-user-interface";

export class CreateUserModel implements ICreateUser {
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
  password: string;

  constructor(value: any) {
    this.name = value?.name ?? "";
    this.lastname = value?.lastname ?? "";
    this.phone = value?.phone ?? "";
    this.dateOfBirth = value?.dateOfBirth ?? "";
    this.zipcode = value?.zipcode ?? "";
    this.street = value?.street ?? "";
    this.number = value?.number ?? "";
    this.neighborhood = value?.neighborhood ?? "";
    this.city = value?.city ?? "";
    this.state = value?.state ?? "";
    this.email = value?.email ?? "";
    this.password = value?.password ?? "";
  }
}
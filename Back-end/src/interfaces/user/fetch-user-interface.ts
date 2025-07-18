export interface IFetchCliente {
  id: string;
  name: string;
  lastname: string;
  phone: string;
  dateOfBirth: string; // ou string, dependendo do formato usado
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
}

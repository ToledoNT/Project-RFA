export interface IFetchCliente {
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
  acesstokenApi: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
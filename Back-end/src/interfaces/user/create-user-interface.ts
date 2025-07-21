export interface ICreateUser {
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
  acesstokenApi?: string;
  resetToken: string;
  resetTokenExpiresAt: string;
}
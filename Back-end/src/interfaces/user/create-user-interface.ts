export interface ICreateUser {
  name: string;
  lastname: string;
  phone: string;
  dateOfBirth: string; // ou string, se você estiver tratando como string no frontend
  zipcode: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  email: string;
  password: string;
}
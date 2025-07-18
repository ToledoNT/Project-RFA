export interface IUpdateUser {
  name?: string;
  lastname?: string;
  phone?: string;
  dateOfBirth?: string; // ou string, dependendo do formato usado no seu app
  zipcode?: string;
  street?: string;
  number?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  email?: string;
  password?: string;
}

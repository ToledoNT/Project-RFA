export class CreateUserModel {
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
  acesstokenApi: string;

  constructor(data: Partial<CreateUserModel>) {
    this.name = data.name ?? '';
    this.lastname = data.lastname ?? '';
    this.phone = data.phone ?? '';
    this.dateOfBirth = data.dateOfBirth ?? '';
    this.zipcode = data.zipcode ?? '';
    this.street = data.street ?? '';
    this.number = data.number ?? '';
    this.neighborhood = data.neighborhood ?? '';
    this.city = data.city ?? '';
    this.state = data.state ?? '';
    this.email = data.email ?? '';
    this.password = data.password ?? '';
    this.acesstokenApi = data.acesstokenApi ?? ''; 
  }
}
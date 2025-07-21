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
  resetToken: string;
  resetTokenExpiresAt?: Date;  // muda para Date opcional

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
    this.resetToken = data.resetToken ?? '';
    
    if (data.resetTokenExpiresAt) {
      this.resetTokenExpiresAt = new Date(data.resetTokenExpiresAt);
      if (isNaN(this.resetTokenExpiresAt.getTime())) {
        this.resetTokenExpiresAt = undefined;
      }
    } else {
      this.resetTokenExpiresAt = undefined;
    }
  }
}
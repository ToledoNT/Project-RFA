import { IFetchCliente } from "../../interfaces/user/fetch-user-interface";

export class UpdateClienteModel {
  id?: string;
  name?: string;
  lastname?: string;
  phone?: string;
  dateOfBirth?: string;
  zipcode?: string;
  street?: string;
  number?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  email?: string;
  password?: string;              
  isEmailConfirmed?: boolean;
  acesstokenApi?: string; 

  constructor(newValue: Partial<IFetchCliente>, oldValue: IFetchCliente) {
    this.formatFields(newValue, oldValue);
  }

  private formatFields(newValue: Partial<IFetchCliente>, oldValue: IFetchCliente) {
    this.id = this.getUpdatedValue(newValue.id, oldValue.id);
    this.name = this.getUpdatedValue(newValue.name, oldValue.name);
    this.lastname = this.getUpdatedValue(newValue.lastname, oldValue.lastname);
    this.phone = this.getUpdatedValue(newValue.phone, oldValue.phone);
    this.dateOfBirth = this.getUpdatedValue(newValue.dateOfBirth, oldValue.dateOfBirth);
    this.zipcode = this.getUpdatedValue(newValue.zipcode, oldValue.zipcode);
    this.street = this.getUpdatedValue(newValue.street, oldValue.street);
    this.number = this.getUpdatedValue(newValue.number, oldValue.number);
    this.neighborhood = this.getUpdatedValue(newValue.neighborhood, oldValue.neighborhood);
    this.city = this.getUpdatedValue(newValue.city, oldValue.city);
    this.state = this.getUpdatedValue(newValue.state, oldValue.state);
    this.email = this.getUpdatedValue(newValue.email, oldValue.email);
    this.password = this.getUpdatedValue(newValue.password, oldValue.password);  
    this.isEmailConfirmed = this.getUpdatedValue(newValue.isEmailConfirmed, oldValue.isEmailConfirmed);
    this.acesstokenApi = this.getUpdatedValue(newValue.acesstokenApi, oldValue.acesstokenApi);
  }

  private getUpdatedValue<T>(newVal: T | undefined, oldVal: T): T {
    return newVal !== undefined && newVal !== oldVal ? newVal : oldVal;
  }
}
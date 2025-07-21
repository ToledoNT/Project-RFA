import { ChangeEvent } from "react";

export interface IRegisterFormData {
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
  confirmPass: string; 
}

export interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: string;
}
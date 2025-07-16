import { ChangeEvent } from "react";

export interface IRegisterFormData {
  nome: string;
  sobrenome: string;
  telefone: string;
  nascimento: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
}

export interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: string;
}

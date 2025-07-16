"use client";
import { useRouter } from "next/navigation";
import { useState, FormEvent, ChangeEvent } from "react";
import { InputProps, IRegisterFormData } from "../interfaces/register-interface";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<IRegisterFormData>({
    nome: "",
    sobrenome: "",
    telefone: "",
    nascimento: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    cep: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    alert("Conta criada com sucesso!");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 space-y-5">
        <h1 className="text-xl font-bold text-center text-gray-900">Criar Conta</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Nome e Sobrenome */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input label="Nome" name="nome" value={formData.nome} onChange={handleChange} required />
            <Input label="Sobrenome" name="sobrenome" value={formData.sobrenome} onChange={handleChange} required />
          </div>

          {/* Telefone e Nascimento */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input label="Telefone" name="telefone" type="tel" value={formData.telefone} onChange={handleChange} required />
            <Input label="Nascimento" name="nascimento" type="date" value={formData.nascimento} onChange={handleChange} required />
          </div>

          {/* CEP */}
          <Input label="CEP" name="cep" value={formData.cep} onChange={handleChange} />

          {/* Rua, Número, Bairro */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input label="Rua" name="rua" value={formData.rua} onChange={handleChange} />
            <Input label="Número" name="numero" value={formData.numero} onChange={handleChange} />
            <Input label="Bairro" name="bairro" value={formData.bairro} onChange={handleChange} />
          </div>

          {/* Cidade e Estado */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input label="Cidade" name="cidade" value={formData.cidade} onChange={handleChange} />
            <Input label="Estado" name="estado" value={formData.estado} onChange={handleChange} />
          </div>

          {/* Email */}
          <Input label="E-mail" name="email" type="email" value={formData.email} onChange={handleChange} required />

          {/* Senha e Confirmar Senha */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input label="Senha" name="senha" type="password" value={formData.senha} onChange={handleChange} required />
            <Input label="Confirmar Senha" name="confirmarSenha" type="password" value={formData.confirmarSenha} onChange={handleChange} required />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
          >
            Criar Conta
          </button>
        </form>
      </div>
    </div>
  );
}

function Input({ label, name, value, onChange, required = false, type = "text" }: InputProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full mt-1 p-2 rounded-lg border border-gray-300"
      />
    </div>
  );
}
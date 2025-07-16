"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent, ChangeEvent } from "react";
import { InputProps, IRegisterFormData } from "../interfaces/register-interface";
import Footer from "../components/Footer";

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

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (errors[e.target.name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[e.target.name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nome.trim()) newErrors.nome = "Nome é obrigatório";
    if (!formData.sobrenome.trim()) newErrors.sobrenome = "Sobrenome é obrigatório";
    if (!formData.telefone.trim()) newErrors.telefone = "Telefone é obrigatório";
    if (!formData.email.trim()) newErrors.email = "E-mail é obrigatório";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Formato de e-mail inválido";
    if (!formData.senha) newErrors.senha = "Senha é obrigatória";
    else if (formData.senha.length < 6) newErrors.senha = "Senha deve ter pelo menos 6 caracteres";
    if (formData.senha !== formData.confirmarSenha) newErrors.confirmarSenha = "Senhas não coincidem";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      alert("Conta criada com sucesso!");
      router.push("/login");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <main className="flex-grow flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg bg-white shadow-xl rounded-xl p-8 space-y-8">
          <h1 className="text-3xl font-extrabold text-center text-gray-900">
            Criar Conta
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            {/* Nome e Sobrenome */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="Nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                error={errors.nome}
                required
              />
              <Input
                label="Sobrenome"
                name="sobrenome"
                value={formData.sobrenome}
                onChange={handleChange}
                error={errors.sobrenome}
                required
              />
            </div>

            {/* Telefone e Nascimento */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="Telefone"
                name="telefone"
                type="tel"
                value={formData.telefone}
                onChange={handleChange}
                error={errors.telefone}
                required
              />
              <Input
                label="Nascimento"
                name="nascimento"
                type="date"
                value={formData.nascimento}
                onChange={handleChange}
              />
            </div>

            {/* CEP */}
            <Input
              label="CEP"
              name="cep"
              value={formData.cep}
              onChange={handleChange}
            />

            {/* Rua, Número, Bairro */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Input label="Rua" name="rua" value={formData.rua} onChange={handleChange} />
              <Input label="Número" name="numero" value={formData.numero} onChange={handleChange} />
              <Input label="Bairro" name="bairro" value={formData.bairro} onChange={handleChange} />
            </div>

            {/* Cidade e Estado */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input label="Cidade" name="cidade" value={formData.cidade} onChange={handleChange} />
              <Input label="Estado" name="estado" value={formData.estado} onChange={handleChange} />
            </div>

            {/* Email */}
            <Input
              label="E-mail"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />

            {/* Senha e Confirmar Senha */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="Senha"
                name="senha"
                type="password"
                value={formData.senha}
                onChange={handleChange}
                error={errors.senha}
                required
              />
              <Input
                label="Confirmar Senha"
                name="confirmarSenha"
                type="password"
                value={formData.confirmarSenha}
                onChange={handleChange}
                error={errors.confirmarSenha}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition
                disabled:bg-blue-400 disabled:cursor-not-allowed`}
            >
              {isSubmitting ? "Criando conta..." : "Criar Conta"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Input({
  label,
  name,
  value,
  onChange,
  required = false,
  type = "text",
  error,
}: InputProps & { error?: string }) {
  return (
    <div>
      <label htmlFor={name} className="block mb-1 text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`w-full mt-1 p-3 rounded-lg border transition
          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:border-blue-300 focus:ring-blue-300"
          }
          text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2`}
        placeholder={`Digite seu ${label.toLowerCase()}`}
        onFocus={(e) => {
          e.currentTarget.style.boxShadow = error
            ? "0 0 8px 2px rgba(239, 68, 68, 0.4)"
            : "0 0 8px 2px rgba(59, 130, 246, 0.4)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow = "none";
        }}
      />
      {error && (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-600 select-none">
          {error}
        </p>
      )}
    </div>
  );
}
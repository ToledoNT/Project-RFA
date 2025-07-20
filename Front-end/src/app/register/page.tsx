"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent, ChangeEvent } from "react";
import { InputProps, IRegisterFormData } from "../interfaces/register-interface";
import Footer from "../components/footer";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<IRegisterFormData>({
    name: "",
    lastname: "",
    phone: "",
    dateOfBirth: "",
    zipcode: "",
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    state: "",
    email: "",
    password: "",
    confirmPass: "",
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

    if (!formData.name.trim()) newErrors.name = "Nome é obrigatório";
    if (!formData.lastname.trim()) newErrors.lastname = "Sobrenome é obrigatório";
    if (!formData.phone.trim()) newErrors.phone = "Telefone é obrigatório";
    if (!formData.email.trim()) newErrors.email = "E-mail é obrigatório";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Formato de e-mail inválido";
    if (!formData.password) newErrors.password = "Senha é obrigatória";
    else if (formData.password.length < 6) newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    if (formData.password !== formData.confirmPass) newErrors.confirmarSenha = "Senhas não coincidem";

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
      <main className="flex-grow flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-lg bg-white shadow-xl rounded-xl p-6 space-y-6">
          <h1 className="text-2xl font-bold text-center text-gray-900">
            Criar Conta
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Nome" name="name" value={formData.name} onChange={handleChange} error={errors.name} required />
              <Input label="Sobrenome" name="lastname" value={formData.lastname} onChange={handleChange} error={errors.lastname} required />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Telefone" name="phone" type="tel" value={formData.phone} onChange={handleChange} error={errors.phone} required />
              <Input label="Data de Nascimento" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} />
            </div>

            <Input label="CEP" name="zipcode" value={formData.zipcode} onChange={handleChange} />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input label="Rua" name="street" value={formData.street} onChange={handleChange} />
              <Input label="Número" name="number" value={formData.number} onChange={handleChange} />
              <Input label="Bairro" name="neighborhood" value={formData.neighborhood} onChange={handleChange} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Cidade" name="city" value={formData.city} onChange={handleChange} />
              <Input label="Estado" name="state" value={formData.state} onChange={handleChange} />
            </div>

            <Input label="E-mail" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} required />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Senha" name="password" type="password" value={formData.password} onChange={handleChange} error={errors.password} required />
              <Input label="Confirmar Senha" name="confirmarSenha" type="password" value={formData.confirmPass} onChange={handleChange} error={errors.confirmarSenha} required />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition disabled:bg-blue-400 disabled:cursor-not-allowed`}
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
        className={`w-full mt-1 p-2 rounded-lg border transition
          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:border-blue-300 focus:ring-blue-300"
          }
          text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2`}
        placeholder={`Digite seu ${label.toLowerCase()}`}
        onFocus={(e) => {
          e.currentTarget.style.boxShadow = error
            ? "0 0 6px 1px rgba(239, 68, 68, 0.4)"
            : "0 0 6px 1px rgba(59, 130, 246, 0.4)";
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
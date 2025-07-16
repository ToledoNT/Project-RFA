"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Footer from "../components/Footer";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errors, setErrors] = useState<{ email?: string; senha?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: { email?: string; senha?: string } = {};
    if (!email) newErrors.email = "O e-mail é obrigatório";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Formato de e-mail inválido";

    if (!senha) newErrors.senha = "A senha é obrigatória";
    else if (senha.length < 6) newErrors.senha = "A senha precisa ter ao menos 6 caracteres";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    // Simula delay de envio
    setTimeout(() => {
      setIsSubmitting(false);

      if (email === "francis.toledo@stor7.com.br" && senha === "123456") {
        localStorage.setItem("loggedIn", "true");
        router.push("/home");
      } else {
        alert("E-mail ou senha incorretos");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-black px-4">
      {/* Conteúdo do login */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md bg-white shadow-2xl rounded-xl p-10 space-y-8">
          <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8 drop-shadow-md">
            Login
          </h1>
          <form className="space-y-6" onSubmit={handleLogin} noValidate>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                className={`w-full p-4 rounded-lg border transition
                  ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }
                  text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2`}
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!errors.email}
                aria-describedby="email-error"
                disabled={isSubmitting}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-red-600 text-sm select-none">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="senha" className="block mb-2 text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                type="password"
                id="senha"
                className={`w-full p-4 rounded-lg border transition
                  ${
                    errors.senha
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }
                  text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2`}
                placeholder="********"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                aria-invalid={!!errors.senha}
                aria-describedby="senha-error"
                disabled={isSubmitting}
              />
              {errors.senha && (
                <p id="senha-error" className="mt-1 text-red-600 text-sm select-none">
                  {errors.senha}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold transition
                disabled:bg-blue-400 disabled:cursor-not-allowed`}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
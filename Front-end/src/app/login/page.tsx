"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Footer from "../components/footer";
import { ApiService } from "../api/api-requests";

const apiService = new ApiService();

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errors, setErrors] = useState<{ email?: string; senha?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: { email?: string; senha?: string } = {};

    if (!email) {
      newErrors.email = "O e-mail é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Formato de e-mail inválido";
    }

    if (!senha) {
      newErrors.senha = "A senha é obrigatória";
    } else if (senha.length < 6) {
      newErrors.senha = "A senha precisa ter ao menos 6 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await apiService.loginUser({ email, password: senha });

      if (response.success) {
        if (response.user?.isEmailConfirmed) {
          if (typeof window !== "undefined") {
            localStorage.setItem("loggedIn", "true");

            if (response.user) {
              localStorage.setItem("userData", JSON.stringify(response.user));
              localStorage.setItem("email", response.user.email);
              localStorage.setItem("token", response.user.token);
            }
          }

          await router.push("/home");
        } else {
          alert("Por favor, confirme seu e-mail antes de fazer login.");
        }
      } else {
        alert(response.message || "E-mail ou senha incorretos");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Erro ao tentar fazer login");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-black px-4">
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
                className={`w-full p-4 rounded-lg border transition ${
                  errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                } text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2`}
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
                className={`w-full p-4 rounded-lg border transition ${
                  errors.senha ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                } text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2`}
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

            <div className="text-right">
              <button
                type="button"
                onClick={() => router.push("/recovery-pass")}
                className="text-sm text-blue-600 hover:underline transition"
              >
                Esqueceu a sua senha?
              </button>
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

      <Footer />
    </div>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "../components/footer";

export default function RecuperarSenhaPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      alert("Digite um e-mail válido");
      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      alert("E-mail de recuperação enviado (simulado)");
      router.push("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-black px-4">
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md bg-white shadow-2xl rounded-xl p-10 space-y-6">
          <h1 className="text-3xl font-extrabold text-center text-gray-900 drop-shadow-md">
            Recuperar Senha
          </h1>
          <p className="text-center text-gray-600 text-sm">
            Coloque seu e-mail para recuperar sua senha
          </p>

          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900 placeholder-gray-400 transition"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={submitted}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:bg-blue-400 disabled:cursor-not-allowed"
              disabled={submitted}
            >
              {submitted ? "Enviando..." : "Enviar link de recuperação"}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
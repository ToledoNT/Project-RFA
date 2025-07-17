"use client";

import { useState } from "react";
import Footer from "../components/footer";

export default function Contato() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [assunto, setAssunto] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    alert("Mensagem enviada com sucesso!");
    
    // Resetar formulário
    setNome("");
    setEmail("");
    setAssunto("");
    setMensagem("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white px-6 py-12">
      <main className="flex flex-col flex-grow max-w-xl mx-auto">
        <h1 className="text-4xl font-extrabold text-blue-500 mb-6 drop-shadow-lg">
          Fale Conosco
        </h1>
        <p className="mb-8 text-blue-300 drop-shadow-md">
          Tem alguma dúvida ou quer falar sobre nossos serviços? Envie sua mensagem abaixo!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 text-sm">Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Seu nome"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Assunto</label>
            <input
              type="text"
              value={assunto}
              onChange={(e) => setAssunto(e.target.value)}
              required
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Assunto da mensagem"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Mensagem</label>
            <textarea
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              required
              rows={5}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Escreva sua mensagem aqui"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow transition-transform active:scale-95"
          >
            Enviar Mensagem
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
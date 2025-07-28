"use client";
import { useState } from "react";
import { ApiService } from "../api/api-requests";

export default function Configuracoes() {
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const api = new ApiService();

  const handleAlterarSenha = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (novaSenha !== confirmarSenha) {
      setError("A nova senha e a confirmação não coincidem.");
      return;
    }

    const email = localStorage.getItem("email");
    if (!email) {
      setError("Email não encontrado. Faça login novamente.");
      return;
    }

    setIsSubmitting(true);

    try {
      await api.resetPass(email, senhaAtual, novaSenha);
      setSuccess("Senha atualizada com sucesso!");
      setSenhaAtual("");
      setNovaSenha("");
      setConfirmarSenha("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        const msg = err.message.toLowerCase();
        if (msg.includes("token") || msg.includes("unauthorized") || msg.includes("401")) {
          localStorage.removeItem("token");
          localStorage.removeItem("email");
          alert("Sua sessão expirou. Por favor, faça login novamente.");
          window.location.href = "/login";
          return;
        }
        setError(err.message);
      } else {
        setError("Erro desconhecido ao atualizar a senha");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-6">
      <div className="bg-gray-800/90 rounded-xl shadow-xl max-w-md w-full p-8">
        <h1 className="text-4xl font-extrabold text-blue-400 mb-4 text-center">
          Deseja trocar sua senha?
        </h1>
        <p className="text-gray-300 mb-8 text-center">
          Altere sua senha para manter sua conta segura.
        </p>

        <form onSubmit={handleAlterarSenha} className="space-y-6" noValidate>
          <div>
            <label htmlFor="senhaAtual" className="block text-sm font-medium mb-1 text-gray-300">
              Senha Atual
            </label>
            <input
              id="senhaAtual"
              type="password"
              value={senhaAtual}
              onChange={(e) => setSenhaAtual(e.target.value)}
              placeholder="Digite sua senha atual"
              required
              disabled={isSubmitting}
              autoFocus
              className={`w-full rounded-md px-4 py-3 bg-gray-900 text-white border ${
                error ? "border-red-500" : "border-gray-700"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
            />
          </div>

          <div>
            <label htmlFor="novaSenha" className="block text-sm font-medium mb-1 text-gray-300">
              Nova Senha
            </label>
            <input
              id="novaSenha"
              type="password"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              placeholder="Digite a nova senha"
              required
              disabled={isSubmitting}
              className={`w-full rounded-md px-4 py-3 bg-gray-900 text-white border ${
                error ? "border-red-500" : "border-gray-700"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
            />
          </div>

          <div>
            <label htmlFor="confirmarSenha" className="block text-sm font-medium mb-1 text-gray-300">
              Confirmar Nova Senha
            </label>
            <input
              id="confirmarSenha"
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              placeholder="Confirme a nova senha"
              required
              disabled={isSubmitting}
              className={`w-full rounded-md px-4 py-3 bg-gray-900 text-white border ${
                error ? "border-red-500" : "border-gray-700"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
            />
          </div>

          {error && <p className="text-red-500 text-center text-sm mt-2">{error}</p>}
          {success && <p className="text-green-500 text-center text-sm mt-2">{success}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 mt-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold transition-transform active:scale-95 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Alterando..." : "Alterar Senha"}
          </button>
        </form>
      </div>
    </div>
  );
}
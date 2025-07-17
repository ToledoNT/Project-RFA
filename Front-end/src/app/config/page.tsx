"use client";
import { useState } from "react";

export default function Configuracoes() {
  const [email, setEmail] = useState("usuario@email.com");
  const [telefone, setTelefone] = useState("11999999999");

  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleAlterarEmail = () => {
    console.log("Novo email:", email);
    alert("Email atualizado com sucesso!");
  };

  const handleAlterarTelefone = () => {
    console.log("Novo telefone:", telefone);
    alert("Telefone atualizado com sucesso!");
  };

  const handleAlterarSenha = (e: React.FormEvent) => {
    e.preventDefault();

    if (novaSenha !== confirmarSenha) {
      alert("A nova senha e a confirmação não coincidem.");
      return;
    }
    
    alert("Senha atualizada com sucesso!");
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-blue-400">Configurações da Conta</h1>
        <div className="space-y-8">
          {/* EMAIL */}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              onClick={handleAlterarEmail}
              type="button"
              className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full shadow transition-transform active:scale-95"
            >
              Alterar Email
            </button>
          </div>

          {/* TELEFONE */}
          <div>
            <label className="block text-sm mb-1">Telefone</label>
            <input
              type="tel"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: 11999999999"
              pattern="[0-9]{11}"
              required
            />
            <button
              onClick={handleAlterarTelefone}
              type="button"
              className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full shadow transition-transform active:scale-95"
            >
              Alterar Telefone
            </button>
          </div>

          {/* SENHA */}
          <form onSubmit={handleAlterarSenha} className="space-y-6">
            <div>
              <label className="block text-sm mb-1">Senha Atual</label>
              <input
                type="password"
                value={senhaAtual}
                onChange={(e) => setSenhaAtual(e.target.value)}
                className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite sua senha atual"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Nova Senha</label>
              <input
                type="password"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite a nova senha"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Confirmar Nova Senha</label>
              <input
                type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirme a nova senha"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow transition-transform active:scale-95"
            >
              Alterar Senha
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
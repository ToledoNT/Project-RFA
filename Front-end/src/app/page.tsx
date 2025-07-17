"use client";
import { useRouter } from "next/navigation";
import { FaSignInAlt, FaUserPlus, FaUsers } from "react-icons/fa"; // substituído FaInfoCircle por FaUsers
import Footer from "./components/footer";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-black text-center px-6">
      <main className="flex flex-col items-center justify-center flex-grow py-16">
        <h1 className="text-5xl font-extrabold text-white mb-6 drop-shadow-lg">
          Bem-vindo ao <span className="text-blue-500">GK Detailer</span>
        </h1>
        <p className="text-blue-300 text-lg max-w-xl mb-10 drop-shadow-md">
          Faça login para comprar o seu número e garantir sua participação.
        </p>

        {/* Botões de Login e Registro */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button
            onClick={() => router.push("/login")}
            className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg transition-transform active:scale-95"
            aria-label="Ir para Login"
          >
            Ir para Login <FaSignInAlt size={24} />
          </button>
          <button
            onClick={() => router.push("/register")}
            className="inline-flex items-center gap-3 bg-gray-700 hover:bg-gray-800 text-white font-semibold px-8 py-4 rounded-full shadow-lg transition-transform active:scale-95"
            aria-label="Criar Conta"
          >
            Criar Conta <FaUserPlus size={24} />
          </button>
        </div>

        {/* Botão Sobre Nós com mesmo estilo */}
        <div className="mt-2">
          <button
            onClick={() => router.push("/sobre")}
            className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg transition-transform active:scale-95"
            aria-label="Sobre Nós"
          >
            Sobre Nós <FaUsers size={24} />
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
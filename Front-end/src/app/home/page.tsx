"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, memo } from "react";
import { FaSignOutAlt } from "react-icons/fa";

type TabType = "comprar" | "minhasRifas";

interface RifaButtonProps {
  numero: number;
  comprado: boolean;
  onClick: () => void;
}

const RifaButtonComponent = ({ numero, comprado, onClick }: RifaButtonProps) => (
  <button
    type="button"
    disabled={comprado}
    onClick={onClick}
    className={`w-full py-3 rounded-full font-semibold transition select-none
      focus:outline-none focus:ring-2 focus:ring-blue-500
      ${comprado ? "bg-gray-800 cursor-not-allowed text-gray-600" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
    aria-disabled={comprado}
    aria-label={comprado ? `Rifa número ${numero} comprada` : `Comprar rifa número ${numero}`}
  >
    {numero}
  </button>
);

const RifaButton = memo(RifaButtonComponent);
RifaButton.displayName = "RifaButton";

export default function HomePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [rifasDisponiveis, setRifasDisponiveis] = useState<number[]>([]);
  const [rifasCompradas, setRifasCompradas] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>("comprar");
  const [username, setUsername] = useState("Usuário"); // Simulação do nome do usuário

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (!loggedIn) {
      router.push("/login");
      return;
    }

    setLoading(false);

    // Simula fetch do nome do usuário do backend
    setUsername("Francis");

    // Inicializa rifas disponíveis (1 a 100)
    setRifasDisponiveis(Array.from({ length: 100 }, (_, i) => i + 1));

    // Recupera rifas compradas do localStorage
    const compradas = localStorage.getItem("rifasCompradas");
    if (compradas) {
      setRifasCompradas(JSON.parse(compradas));
    }
  }, [router]);

  const comprarRifa = (numero: number) => {
    if (rifasCompradas.includes(numero)) {
      alert("Você já comprou essa rifa.");
      return;
    }

    const novasCompras = [...rifasCompradas, numero];
    setRifasCompradas(novasCompras);
    localStorage.setItem("rifasCompradas", JSON.stringify(novasCompras));
    alert(`Você comprou a rifa número ${numero}!`);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("rifasCompradas");
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black px-6">
        <p className="text-white text-lg">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between bg-gray-900 px-6 py-4 shadow-md sticky top-0 z-50">
        <h1 className="text-3xl font-extrabold text-blue-500 select-none tracking-wide">
          GK DETAILER
        </h1>
        <button
          onClick={handleLogout}
          aria-label="Sair"
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 px-5 py-2 rounded-full font-semibold transition-transform active:scale-95 shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Sair <FaSignOutAlt size={18} />
        </button>
      </nav>

      {/* Saudação do usuário */}
      <div className="bg-gray-900 px-6 py-4 border-b border-gray-700 select-none">
        <p className="text-xl font-medium text-blue-400">
          Olá, <span className="font-extrabold text-white">{username}</span>!
        </p>
      </div>

      {/* Conteúdo */}
      <main className="flex flex-col flex-1 px-6 py-8 max-w-6xl mx-auto w-full">
        {/* Abas */}
        <div className="flex gap-8 mb-8 border-b border-gray-700 select-none">
          {(["comprar", "minhasRifas"] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 font-semibold text-lg transition-colors
                focus:outline-none focus:ring-2 focus:ring-blue-500
                ${
                  activeTab === tab
                    ? "border-b-4 border-blue-500 text-blue-400"
                    : "text-gray-400 hover:text-blue-500"
                }`}
              aria-selected={activeTab === tab}
              role="tab"
              tabIndex={activeTab === tab ? 0 : -1}
            >
              {tab === "comprar" ? "Comprar Rifas" : "Minhas Rifas"}
            </button>
          ))}
        </div>

        {/* Conteúdo das abas */}
        {activeTab === "comprar" && (
          <section>
            <h2 className="text-3xl font-semibold mb-6 tracking-tight">
              Rifas Disponíveis
            </h2>
            <div
              className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 gap-4 max-h-[450px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-900"
              role="list"
              aria-label="Lista de rifas disponíveis"
            >
              {rifasDisponiveis.map((num) => (
                <RifaButton
                  key={num}
                  numero={num}
                  comprado={rifasCompradas.includes(num)}
                  onClick={() => comprarRifa(num)}
                />
              ))}
            </div>
          </section>
        )}

        {activeTab === "minhasRifas" && (
          <section>
            <h2 className="text-3xl font-semibold mb-6 tracking-tight">
              Rifas Compradas
            </h2>
            {rifasCompradas.length === 0 ? (
              <p className="text-gray-400 select-none">
                Você ainda não comprou nenhuma rifa.
              </p>
            ) : (
              <ul
                className="flex flex-wrap gap-4 justify-start"
                role="list"
                aria-label="Lista de rifas compradas"
              >
                {rifasCompradas.map((num) => (
                  <li
                    key={num}
                    className="px-8 py-4 bg-green-600 rounded-full font-semibold select-none shadow-md text-lg"
                  >
                    {num}
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

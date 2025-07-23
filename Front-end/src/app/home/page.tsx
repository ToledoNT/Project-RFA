"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "../components/footer";
import Menu from "../components/menu-home";
import RifasPainel from "../components/rifa-card";
import { ApiService } from "../api/api-requests";
import { Rifa } from "../interfaces/home-interface";

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [rifasDisponiveis, setRifasDisponiveis] = useState<Rifa[]>([]);
  const [rifasCompradas, setRifasCompradas] = useState<number[]>([]);
  const [mostrarDisponiveis, setMostrarDisponiveis] = useState(true);
  const [mostrarPainel, setMostrarPainel] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const loggedIn = localStorage.getItem("loggedIn");

      if (!loggedIn) {
        router.push("/login");
        return;
      }

      const userDataString = localStorage.getItem("userData");
      if (userDataString) {
        try {
          const userData = JSON.parse(userDataString);
          const nomeCompleto = userData.name
            ? userData.surname
              ? `${userData.name} ${userData.surname}`
              : userData.name
            : "";
          setUsername(nomeCompleto);
        } catch {
          setUsername("");
        }
      }

      try {
        const apiService = new ApiService();
        const rifas = await apiService.rifaNumbers();

        if (Array.isArray(rifas)) {
          const numerosFormatados = rifas.map((rifa) => ({
            ...rifa,
            status: rifa.status === "AVAILABLE" ? "Disponível" : rifa.status,
          }));

          setRifasDisponiveis(numerosFormatados);
        } else {
          alert("Não foi possível carregar as rifas disponíveis.");
        }

        const compradas = localStorage.getItem("rifasCompradas");
        if (compradas) setRifasCompradas(JSON.parse(compradas));
      } catch (err) {
        console.error("Erro ao buscar rifas:", err);
        alert("Erro ao buscar rifas.");
      }

      setLoading(false);
    }

    fetchData();
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black px-6">
        <p className="text-white text-lg">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white relative">
      <Menu />

      <div className="absolute top-16 left-6 text-white text-sm z-50 select-none">
        Olá, <span className="font-bold">{username}</span> 👋
      </div>

      <div className="mt-20" />

      <main className="flex flex-col flex-1 px-6 py-8 max-w-6xl mx-auto w-full">
        <h2 className="text-3xl font-semibold mb-6 tracking-tight">Rifas</h2>

        {!mostrarPainel ? (
          <button
            onClick={() => setMostrarPainel(true)}
            className="px-2 py-1 mb-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold text-xs max-w-[100px] transition"
          >
            Ver Números
          </button>
        ) : (
          <RifasPainel
            rifasDisponiveis={rifasDisponiveis}
            rifasCompradas={rifasCompradas}
            mostrarDisponiveis={mostrarDisponiveis}
            setMostrarDisponiveis={setMostrarDisponiveis}
            comprarRifa={comprarRifa}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ConfirmarEmailPage() {
  const [status, setStatus] = useState("Verificando...");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("Token inválido.");
      return;
    }

    const confirmar = async () => {
      try {
        const res = await fetch("/api/confirmar-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        if (!res.ok) throw new Error();

        setStatus("Email confirmado com sucesso!");
        setTimeout(() => router.push("/login"), 2000);
      } catch (err) {
        setStatus("Falha ao confirmar o e-mail ou link expirado.");
      }
    }

    confirmar();
  }, [searchParams, router]);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold">{status}</h1>
    </div>
  );
}
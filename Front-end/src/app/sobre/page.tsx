"use client";

import Footer from "../components/footer";
export default function Sobre() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white px-6 py-12">
      <main className="flex flex-col flex-grow max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-blue-500 mb-6 drop-shadow-lg">
          Sobre a GK Detailer
        </h1>

        <section className="mb-8 text-lg text-blue-300 drop-shadow-md">
          <p>
            A GK Detailer é uma empresa dedicada a oferecer os melhores serviços de detalhamento automotivo,
            focada na qualidade, profissionalismo e satisfação total dos clientes.
          </p>
        </section>

        <section className="mb-8 text-lg text-blue-300 drop-shadow-md">
          <h2 className="text-2xl font-semibold mb-3 text-white">Nossa Missão</h2>
          <p>
            Proporcionar um cuidado excepcional para seu veículo, usando técnicas modernas e produtos de alta qualidade,
            garantindo que seu carro esteja sempre impecável.
          </p>
        </section>

        <section className="mb-8 text-lg text-blue-300 drop-shadow-md">
          <h2 className="text-2xl font-semibold mb-3 text-white">Nossa Visão</h2>
          <p>
            Ser referência nacional em detalhamento automotivo, reconhecida pela excelência e inovação constante.
          </p>
        </section>

        <section className="mb-8 text-lg text-blue-300 drop-shadow-md">
          <h2 className="text-2xl font-semibold mb-3 text-white">Valores</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Compromisso com a qualidade</li>
            <li>Transparência e ética</li>
            <li>Respeito ao cliente</li>
            <li>Inovação contínua</li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
"use client";

import React from "react";
import { FaCheckCircle, FaTicketAlt } from "react-icons/fa";
import RifaButton from "./button/RifaButton";
import { RifasPainelProps } from "../interfaces/home-interface";

export default function RifasPainel({
  rifasDisponiveis,
  rifasCompradas,
  mostrarDisponiveis,
  setMostrarDisponiveis,
  comprarRifa,
}: RifasPainelProps) {
  return (
    <>
      {/* Cabeçalho do painel */}
      <header className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <FaTicketAlt className="text-blue-500" />
          {mostrarDisponiveis ? "Números Disponíveis" : "Números Comprados"}
        </h3>
        <div className="text-gray-400 text-sm">
          {mostrarDisponiveis
            ? `${rifasDisponiveis.length - rifasCompradas.length} números disponíveis`
            : `${rifasCompradas.length} números comprados`}
        </div>
      </header>

      {/* Botões de toggle */}
      <div className="flex gap-4 mb-6 justify-center sm:justify-start">
        <button
          onClick={() => setMostrarDisponiveis(true)}
          aria-pressed={mostrarDisponiveis}
          className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition
            ${
              mostrarDisponiveis
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
        >
          <FaTicketAlt /> Disponíveis
        </button>
        <button
          onClick={() => setMostrarDisponiveis(false)}
          aria-pressed={!mostrarDisponiveis}
          className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition
            ${
              !mostrarDisponiveis
                ? "bg-green-600 text-white shadow-lg"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
        >
          <FaCheckCircle /> Comprados
        </button>
      </div>

      {/* Lista de rifas */}
      {mostrarDisponiveis ? (
        <div
          className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 gap-4 max-h-[450px] overflow-y-auto pr-2
          scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-900"
          role="list"
          aria-label="Lista de rifas disponíveis"
        >
          {rifasDisponiveis
            .filter((rifa) => !rifasCompradas.includes(rifa.number))
            .map((rifa) => (
              <RifaButton
                key={rifa.id}
                numero={rifa.number}
                comprado={false}
                onClick={() => comprarRifa(rifa.number)}
              />
            ))}
        </div>
      ) : rifasCompradas.length === 0 ? (
        <p className="text-center text-gray-400 select-none mt-10 text-lg">
          Você ainda não comprou nenhuma rifa.
        </p>
      ) : (
        <ul
          className="flex flex-wrap gap-4 justify-center sm:justify-start"
          role="list"
          aria-label="Lista de rifas compradas"
        >
          {rifasCompradas.map((num) => (
            <li
              key={num}
              className="px-8 py-4 bg-green-600 rounded-full font-semibold select-none shadow-md text-lg
              flex items-center gap-2"
              aria-label={`Rifa número ${num} comprada`}
            >
              <FaCheckCircle />
              {num}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
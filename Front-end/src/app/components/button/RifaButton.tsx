"use client";
import { RifaButtonProps } from "@/app/interfaces/home-interface";
import { memo } from "react";

const RifaButtonComponent = ({ numero, comprado, onClick }: RifaButtonProps) => (
  <button
    type="button"
    disabled={comprado}
    onClick={onClick}
    className={`w-full py-3 rounded-full font-semibold transition select-none
      focus:outline-none focus:ring-2 focus:ring-blue-500
      ${
        comprado
          ? "bg-gray-800 cursor-not-allowed text-gray-600"
          : "bg-blue-600 hover:bg-blue-700 text-white"
      }`}
    aria-disabled={comprado}
    aria-label={
      comprado
        ? `Rifa número ${numero} comprada`
        : `Comprar rifa número ${numero}`
    }
  >
    {numero}
  </button>
);

const RifaButton = memo(RifaButtonComponent);
RifaButton.displayName = "RifaButton";

export default RifaButton;

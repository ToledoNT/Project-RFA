"use client";

import { FaInstagram, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-4 mt-10 border-t border-gray-800">
      <div className="flex justify-center gap-6 text-white text-3xl">
        <a
          href="https://www.instagram.com/seuInstagram"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-500 transition-colors"
          aria-label="Instagram"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.facebook.com/seuFacebook"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 transition-colors"
          aria-label="Facebook"
        >
          <FaFacebook />
        </a>
      </div>
      <p className="mt-3 text-gray-500 text-sm text-center select-none">
        © {new Date().getFullYear()} GK Detailer. Todos os direitos reservados.
      </p>
    </footer>
  );
}
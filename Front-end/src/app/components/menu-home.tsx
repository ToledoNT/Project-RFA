"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu as MenuIcon, X, Settings } from "lucide-react";
import { FaSignOutAlt } from "react-icons/fa";

export default function Menu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const links = [
    { label: "Início", href: "/" },
    { label: "Serviços", href: "/servicos" },
    { label: "Sobre", href: "/sobre" },
    { label: "Contato", href: "/contato" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("rifasCompradas");
    router.push("/login");
  };

  return (
    <nav className="bg-gray-900 text-white w-full shadow-md fixed top-0 z-50">
      {/* Removi max-w-7xl e mx-auto para que ocupe toda a largura da viewport */}
      <div className="w-full px-4 py-4 flex items-center">
        <h1 className="text-xl font-bold">GK Detailer</h1>

        {/* Menu Desktop */}
        <ul className="hidden sm:flex gap-6 items-center ml-auto">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-blue-400 transition-colors">
                {link.label}
              </a>
            </li>
          ))}

          {/* Configurações */}
          <li>
            <a
              href="/config"
              className="hover:text-blue-400 transition-colors flex items-center gap-1"
              title="Configurações"
            >
              <Settings size={20} />
              Configurações
            </a>
          </li>

          {/* Botão Sair */}
          <li>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-1.5 rounded-full font-semibold transition-all text-sm shadow focus:outline-none"
            >
              <FaSignOutAlt size={16} />
              Sair
            </button>
          </li>
        </ul>

        {/* Mobile */}
        <div className="sm:hidden flex items-center gap-4 ml-auto">
          <button onClick={() => setOpen(!open)} aria-label="Abrir menu">
            {open ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {open && (
        <ul className="sm:hidden bg-gray-800 px-6 py-4 space-y-4">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block text-white hover:text-blue-400 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/configuracoes"
              onClick={() => setOpen(false)}
              className="block text-white hover:text-blue-400 transition-colors flex items-center gap-1"
            >
              <Settings size={18} />
              Configurações
            </a>
          </li>
          <li>
            <button
              onClick={() => {
                setOpen(false);
                handleLogout();
              }}
              className="w-full flex items-center gap-2 text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full text-sm font-semibold"
            >
              <FaSignOutAlt size={16} />
              Sair
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}

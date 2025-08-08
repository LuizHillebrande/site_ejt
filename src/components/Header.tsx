"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/servicos", label: "Serviços" },
  { href: "/ipt", label: "IPT" },
  { href: "/naf", label: "NAF" },
  { href: "/contato", label: "Contato" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white z-50">
      <nav className="container flex items-center justify-between py-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-gray-50 via-white to-gray-50 border border-gray-100">
              <Image 
                src="/images/logos/logo-footer.png" 
                alt="Logo Empresa Júnior Toledo" 
                width={120} 
                height={120} 
                className="h-12 md:h-16 w-auto transition-transform hover:scale-105" 
              />
            </div>
          </Link>
        </motion.div>

        {/* Menu para Desktop */}
        <motion.ul 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:flex gap-8"
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link 
                href={link.href} 
                className="text-dark hover:text-primary font-medium transition-colors relative
                         after:block after:h-0.5 after:bg-primary after:scale-x-0 
                         hover:after:scale-x-100 after:transition-transform 
                         after:origin-left after:duration-300 after:mt-1"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </motion.ul>

        {/* Botão do Menu Mobile */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-gray-600" />
          ) : (
            <Menu className="h-6 w-6 text-gray-600" />
          )}
        </button>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden">
            <ul className="py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="block px-6 py-3 text-dark hover:bg-gray-50 hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
} 
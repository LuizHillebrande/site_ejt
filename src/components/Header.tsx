"use client";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/servicos", label: "Serviços" },
  { href: "/ipt", label: "IPT" },
  { href: "/projetos", label: "Projetos" },
  { href: "/naf", label: "NAF" },
  { href: "/contato", label: "Contato" },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur shadow z-50 border-b border-orange-100">
      <nav className="container flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/logos/logo-principal.png" alt="Logo Empresa Júnior Toledo" width={120} height={120} className="h-20 w-auto" />
        </Link>
        <ul className="flex gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-dark hover:text-primary font-medium transition-colors relative after:block after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left after:duration-300 after:mt-1">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
} 
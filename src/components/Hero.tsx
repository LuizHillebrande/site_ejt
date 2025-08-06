"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-white mt-[-5rem]">
      {/* Imagem de fundo */}
      <div className="relative w-full h-[calc(100vh-5rem)]">
        <Image
          src="/images/header/header_principal.png"
          alt="Empresa Jr Toledo"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover"
          style={{
            objectPosition: "center 30%"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-transparent to-primary/30" />
      </div>

      {/* Gradiente inferior para suavizar transição visual */}
      <div className="relative z-10 h-16 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

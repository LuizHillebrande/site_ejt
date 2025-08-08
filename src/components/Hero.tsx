"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-white mt-[-5rem]">
      {/* Imagem de fundo com efeito de fade */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative w-full h-[calc(100vh-5rem)] min-h-[500px]"
      >
        <Image
          src="/images/header/header_principal.png"
          alt="Empresa Jr Toledo"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover"
          style={{
            objectPosition: "center 30%",
            transform: "none",
            touchAction: "pan-y pinch-zoom"
          }}
          draggable="false"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-transparent to-primary/30" />
        
        {/* Botão de serviços - apenas desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="absolute bottom-12 left-8 z-10 hidden md:block"
        >
          <a 
            href="/servicos" 
            className="px-6 py-3 bg-primary/80 text-white font-semibold rounded-lg inline-block
                     transition-all duration-300 hover:bg-primary hover:scale-105"
          >
            Conheça Nossos Serviços
          </a>
        </motion.div>
      </motion.div>

      {/* Gradiente inferior para suavizar transição visual */}
      <div className="relative z-10 h-16 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

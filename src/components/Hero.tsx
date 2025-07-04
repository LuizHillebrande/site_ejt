"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      className="relative bg-[url('/images/header/header_principal.png')] bg-cover bg-center md:bg-right bg-no-repeat text-white pt-32 pb-24 min-h-[60vh] flex items-center overflow-hidden"
    >
      {/* Overlay para contraste */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/90 to-secondary/80 opacity-80 z-0" />
      <div className="container relative z-10 flex flex-col md:items-end md:text-right text-center md:pr-64">
        <motion.h1
          className="text-5xl md:text-6xl font-sans font-bold mb-6 drop-shadow-lg"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Transformando alunos e empresas<br />em <span className="text-secondary">casos de sucesso</span>
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl font-sans mb-8 text-white/90"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Consultoria, projetos e impacto social com tecnologia e inovação.
        </motion.p>
        <motion.a
          href="#diferenciais"
          className="inline-block bg-white text-primary px-8 py-3 rounded-full font-bold shadow-lg hover:bg-secondary hover:text-white transition-colors text-lg"
          whileHover={{ scale: 1.05 }}
        >
          Conheça nossos diferenciais
        </motion.a>
      </div>
    </section>
  );
} 
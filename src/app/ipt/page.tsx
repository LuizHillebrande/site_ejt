'use client';
import { Download, ArrowRight, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const iptData = [
  { label: "Maiores preços", value: "R$ 503,43" },
  { label: "Menores preços", value: "R$ 297,78" },
  { label: "Diferença", value: "69,06%" },
  { label: "Preços médios", value: "R$ 412,46" },
  { label: "Anterior", value: "R$ 1.130,03" },
  { label: "Atual", value: "R$ 1.085,58" },
  { label: "Inflação", value: "-3,93%" },
];

const vantagens = [
  {
    icon: <CheckCircle className="w-8 h-8 mb-2 text-primary" />,
    title: "Planejamento financeiro pessoal",
    desc: "Acompanhe a evolução dos preços e organize melhor seu orçamento.",
  },
  {
    icon: <CheckCircle className="w-8 h-8 mb-2 text-primary" />,
    title: "Informações confiáveis sobre inflação local",
    desc: "Dados coletados mensalmente pela Empresa Júnior Toledo desde 1994.",
  },
  {
    icon: <CheckCircle className="w-8 h-8 mb-2 text-primary" />,
    title: "Apoio à tomada de decisão empresarial",
    desc: "Empresas podem usar o IPT para ajustar preços e estratégias.",
  },
];

const carouselImages = [
  "/images/ipt/carrousel/img_1.png",
  "/images/ipt/carrousel/img_2.png",
  "/images/ipt/carrousel/img_3.png",
];

export default function IPT() {
  return (
    <main className="bg-background min-h-screen pt-28 pb-0">
      <div className="max-w-6xl mx-auto flex flex-col gap-20 px-4 md:px-6">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center gap-6 pt-8 pb-8">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-primary mb-2"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Índice de Preços Toledo (IPT)
          </motion.h1>
          <motion.p
            className="text-lg md:text-2xl text-dark max-w-2xl mx-auto mb-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Desde 1994, monitoramos os preços da cesta básica de Presidente Prudente, gerando relatórios mensais sobre inflação e tendências econômicas.
          </motion.p>
          <motion.a
            href="#"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-secondary transition duration-300 hover:scale-105 text-lg"
            whileHover={{ scale: 1.05 }}
          >
            <Download className="w-5 h-5" />
            Baixar relatório mais recente
          </motion.a>
        </section>
        {/* Bloco visual com mapa e indicadores */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Image src="/images/ipt/mapa.png" alt="Mapa de Presidente Prudente" width={340} height={220} className="rounded-xl object-cover" />
            <span className="font-bold text-primary">Mapa de Presidente Prudente</span>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {iptData.map((item, i) => (
              <motion.div
                key={item.label}
                className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white font-bold rounded-xl p-4 shadow-lg flex flex-col items-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i }}
              >
                <span className="text-sm opacity-90 font-medium">{item.label}</span>
                <span className="text-2xl md:text-3xl font-extrabold">{item.value}</span>
              </motion.div>
            ))}
          </div>
        </section>
        {/* Sobre o IPT + Carrossel */}
        <section className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-gray-100"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">O que é o IPT?</h2>
            <p className="text-lg text-gray-700">
              O Índice de Preços Toledo (IPT) é uma pesquisa de variação de preços da cesta básica, realizada mensalmente pela Empresa Júnior Toledo desde 1994, com o objetivo de fornecer uma visão clara sobre a inflação e o poder de compra dos prudentinos.
            </p>
          </motion.div>
          {/* Carrossel de imagens */}
          <CarouselIPT />
        </section>
        {/* Vantagens */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">Por que acompanhar o IPT?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vantagens.map((vant, i) => (
              <motion.div
                key={vant.title}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 flex flex-col items-center text-center transition-shadow duration-300"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
              >
                {vant.icon}
                <span className="font-bold text-lg mb-1">{vant.title}</span>
                <span className="text-gray-600 text-base">{vant.desc}</span>
              </motion.div>
            ))}
          </div>
        </section>
        {/* Relatórios Anteriores */}
        <section className="flex flex-col items-center gap-4">
          <span className="text-lg md:text-xl text-center">Quer consultar relatórios anteriores?</span>
          <a href="#" className="flex items-center gap-1 text-orange-600 underline hover:text-orange-800 font-semibold transition">
            Ver últimos relatórios <ArrowRight className="w-4 h-4" />
          </a>
        </section>
        {/* Call to Action Final */}
        <section className="flex justify-center">
          <motion.div
            className="bg-primary rounded-2xl shadow-xl p-8 flex flex-col items-center gap-4 w-full md:w-2/3 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-white text-2xl md:text-3xl font-bold mb-2">Mantenha-se informado.</span>
            <span className="text-white text-lg mb-4">Faça o download do último relatório IPT agora mesmo.</span>
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-white text-primary px-8 py-3 rounded-full font-bold shadow-lg hover:bg-secondary hover:text-white transition duration-300 hover:scale-105 text-lg"
            >
              <Download className="w-5 h-5" />
              Baixar agora
            </a>
          </motion.div>
        </section>
      </div>
    </main>
  );
}

// Componente de carrossel de imagens
function CarouselIPT() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const goTo = (dir: 'left' | 'right') => {
    setIndex((prev) => {
      if (dir === "left") return prev === 0 ? carouselImages.length - 1 : prev - 1;
      if (dir === "right") return (prev + 1) % carouselImages.length;
      return prev;
    });
  };
  return (
    <div className="w-full flex justify-center relative">
      {/* Botão esquerda */}
      <button
        aria-label="Imagem anterior"
        onClick={() => goTo("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary rounded-full p-2 shadow transition z-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl shadow-lg overflow-hidden bg-white flex items-center justify-center h-64 md:h-72 w-full max-w-md"
      >
        <Image
          src={carouselImages[index]}
          alt={`Foto IPT ${index + 1}`}
          width={400}
          height={288}
          className="object-cover w-full h-full"
          priority
        />
      </motion.div>
      {/* Botão direita */}
      <button
        aria-label="Próxima imagem"
        onClick={() => goTo("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary rounded-full p-2 shadow transition z-10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
} 
"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const team = [
  { name: "Letícia Costa", role: "Presidente", image: "/images/equipe/leticia_costa.png" },
  { name: "Larissa Ramos", role: "Vice-presidente", image: "/images/equipe/larissa_ramos.png" },
  { name: "Gabriella Oliveira", role: "Diretora de Projetos", image: "/images/equipe/gabriella_oliveira.png" },
  { name: "Camila Prado", role: "Diretora de Marketing", image: "/images/equipe/camila_prado.png" },
];

// Duplicar o array para efeito infinito
const infiniteTeam = [...team, ...team];

export default function TeamCarousel() {
  const controls = useAnimation();

  useEffect(() => {
    let isMounted = true;
    const animate = async () => {
      while (isMounted) {
        await controls.start({ x: "-50%" }, { duration: 10, ease: "linear" });
        if (isMounted) {
          controls.set({ x: 0 });
        }
      }
    };
    animate();
    return () => {
      isMounted = false;
    };
  }, [controls]);

  return (
    <section id="equipe" className="bg-background py-24">
      <div className="container">
        <motion.h2
          className="text-3xl md:text-4xl font-sans font-bold text-primary text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Nossa Equipe
        </motion.h2>
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-8"
            animate={controls}
            style={{ width: "max-content" }}
          >
            {infiniteTeam.map((member, i) => (
              <div
                key={i + member.name}
                className="min-w-[240px] bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-shadow border-t-4 border-primary flex-shrink-0"
              >
                <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-gray-100 overflow-hidden flex items-center justify-center border-4 border-primary">
                  <img src={member.image} alt={member.name} className="object-cover w-full h-full" />
                </div>
                <h3 className="font-sans text-xl font-bold text-primary mb-2">{member.name}</h3>
                <p className="text-gray-700">{member.role}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
} 
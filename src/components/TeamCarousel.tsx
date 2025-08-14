"use client";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
  active: boolean;
}

export default function TeamCarousel() {
  const [mounted, setMounted] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(0);
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Buscar membros ativos
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('/api/team', {
          cache: 'no-store',
          next: { revalidate: 0 }
        });
        if (!response.ok) throw new Error('Falha ao carregar membros');
        const data = await response.json();
        setTeam(data.filter((member: TeamMember) => member.active));
      } catch (error) {
        console.error('Erro ao carregar membros:', error);
      }
    };

    fetchMembers();
  }, []);

  useEffect(() => {
    if (!mounted || !carouselRef.current || team.length === 0) return;

    let animationFrameId: number;
    let startTime: number;
    const duration = 30000; // 30 segundos para uma volta completa
    const itemWidth = 272; // 240px width + 32px gap
    const totalWidth = itemWidth * team.length;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      // Calcula a nova posição
      let newPosition = -(elapsed % duration) * totalWidth / duration;
      
      // Se chegou ao final do primeiro conjunto, reseta para o início suavemente
      if (-newPosition >= totalWidth) {
        newPosition = 0;
        startTime = timestamp;
      }
      
      if (carouselRef.current) {
        carouselRef.current.style.transform = `translateX(${newPosition}px)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [mounted, team]);

  // Criar três conjuntos do time para o efeito infinito
  const displayTeam = [...team, ...team, ...team];

  if (team.length === 0) {
    return null; // ou um loading spinner
  }

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
          <div className="absolute inset-0 pointer-events-none z-10">
            <div className="absolute left-0 w-32 h-full bg-gradient-to-r from-background to-transparent"></div>
            <div className="absolute right-0 w-32 h-full bg-gradient-to-l from-background to-transparent"></div>
          </div>
          <div
            ref={carouselRef}
            className="flex gap-8 transition-transform duration-1000 ease-linear"
            style={{ width: "max-content" }}
          >
            {displayTeam.map((member, i) => (
              <div
                key={i}
                className="min-w-[240px] bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-shadow border-t-4 border-primary flex-shrink-0"
              >
                <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-gray-100 overflow-hidden flex items-center justify-center border-4 border-primary">
                  <img 
                    src={member.imageUrl} 
                    alt={member.name} 
                    className="object-cover w-full h-full"
                    draggable={false}
                  />
                </div>
                <h3 className="font-sans text-xl font-bold text-primary mb-2">{member.name}</h3>
                <p className="text-gray-700">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 
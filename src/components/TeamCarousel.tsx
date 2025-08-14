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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Buscar membros ativos
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Buscando membros...');
        
        // Função para fazer o fetch com retry
        const fetchWithRetry = async (retries = 3, delay = 1000) => {
          for (let i = 0; i < retries; i++) {
            try {
              const response = await fetch('/api/team', {
                cache: 'no-store',
                next: { revalidate: 0 }
              });

              console.log('Status da resposta:', response.status);
              const data = await response.json();
              console.log('Dados recebidos:', data);

              if (!response.ok) {
                throw new Error(data.error || 'Falha ao carregar membros');
              }

              return data;
            } catch (error) {
              console.error(`Tentativa ${i + 1}/${retries} falhou:`, error);
              if (i === retries - 1) throw error;
              await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
            }
          }
        };

        const data = await fetchWithRetry();
        const activeMembers = data.filter((member: TeamMember) => member.active);
        console.log('Membros ativos:', activeMembers);
        setTeam(activeMembers);
      } catch (error) {
        console.error('Erro ao carregar membros:', error);
        setError('Erro ao carregar membros da equipe');
      } finally {
        setLoading(false);
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

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 py-12">
            {error}
          </div>
        )}

        {!loading && !error && team.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            Nenhum membro encontrado
          </div>
        )}

        {!loading && !error && team.length > 0 && (
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
        )}
      </div>
    </section>
  );
} 
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import ImageEditor from '@/components/ImageEditor';

const servicos = [
  {
    id: "acao-social",
    titulo: "Ação Social",
    descricao: "Desenvolvemos projetos que impactam positivamente nossa comunidade, promovendo inclusão e desenvolvimento social.",
    detalhes: [
      "Arrecadação e distribuição de alimentos",
      "Atividades com idosos e crianças",
      "Projetos de educação financeira",
    ],
    imagens: [
      "/images/servicos/acao_social_1.png",
      "/images/servicos/acao_social_2.png",
      "/images/servicos/acao_social_3.png"
    ],
    corFundo: "bg-primary/5"
  },
  {
    id: "pesquisas",
    titulo: "Pesquisas de Campo",
    descricao: "Realizamos pesquisas nas ruas para entender melhor as necessidades da comunidade e do mercado local.",
    detalhes: [
      "Análise de mercado local",
      "Pesquisas de opinião pública",
      "Levantamento de dados socioeconômicos"
    ],
    imagens: [
      "/images/servicos/consultoria_1.png",
      "/images/servicos/consultoria_2.png"
    ],
    corFundo: "bg-white"
  },
  {
    id: "eventos",
    titulo: "Eventos Acadêmicos",
    descricao: "Organizamos eventos exclusivos dentro da faculdade com vagas limitadas, proporcionando experiências únicas para os alunos.",
    detalhes: [
      "Palestras com profissionais",
      "Workshops práticos",
      "Networking entre alunos"
    ],
    imagens: [
      "/images/servicos/eventos_1.png",
      "/images/servicos/eventos_2.png"
    ],
    corFundo: "bg-secondary/5"
  }
];

function ServicoSection({ servico, index, onEdit }: any) {
  const searchParams = useSearchParams();
  const isEditing = searchParams.get('edit') === 'true';

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    pauseOnHover: true
  };

  return (
    <section className={`py-20 ${servico.corFundo}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold text-dark mb-6">{servico.titulo}</h2>
                <p className="text-lg text-gray-600 mb-8">
                  {servico.descricao}
                </p>
                <ul className="space-y-4">
                  {servico.detalhes.map((detalhe: string, idx: number) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center text-gray-700"
                    >
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      {detalhe}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <div className="order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="rounded-2xl overflow-hidden shadow-xl relative"
              >
                <Slider {...settings}>
                  {servico.imagens.map((imagem: string, idx: number) => (
                    <div key={idx} className="relative aspect-[4/3]">
                      <Image
                        src={imagem}
                        alt={`${servico.titulo} - Imagem ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    </div>
                  ))}
                </Slider>
                {isEditing && (
                  <button
                    onClick={() => onEdit?.(servico.id)}
                    className="absolute top-4 right-4 px-4 py-2 bg-primary text-white rounded-lg shadow-lg hover:bg-primary/90 transition-colors z-10"
                  >
                    Editar imagens
                  </button>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function ServicosPage() {
  const searchParams = useSearchParams();
  const isEditing = searchParams.get('edit') === 'true';
  const [editingService, setEditingService] = useState<string | null>(null);
  const [servicosState, setServicosState] = useState(servicos);

  const handleEdit = (id: string) => {
    setEditingService(id);
  };

  const handleSave = async (id: string, newImages: string[]) => {
    // Aqui você faria uma chamada à API para salvar as novas imagens
    setServicosState(prev => prev.map(servico => 
      servico.id === id ? { ...servico, imagens: newImages } : servico
    ));
    setEditingService(null);
  };

  const currentService = editingService 
    ? servicosState.find(s => s.id === editingService)
    : null;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="flex justify-center lg:justify-start"
              >
                <div className="relative w-64 h-64 lg:w-80 lg:h-80">
                  <Image
                    src="/images/logos/logo-completa.png"
                    alt="Logo EJT"
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>

              {/* Texto */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-left lg:border-l-2 lg:border-primary/20 lg:pl-12"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h1 className="text-4xl lg:text-5xl font-bold text-dark mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Nossos Serviços
                  </h1>
                </motion.div>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-lg lg:text-xl text-gray-600 leading-relaxed"
                >
                  Oferecemos uma variedade de serviços focados no desenvolvimento acadêmico e social, 
                  <span className="text-primary font-semibold"> sempre buscando impactar positivamente </span>
                  nossa comunidade através de ações práticas e efetivas.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mt-8 flex gap-4"
                >
                  <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                  <div className="h-1 w-10 bg-gradient-to-r from-primary to-secondary opacity-50 rounded-full"></div>
                  <div className="h-1 w-5 bg-gradient-to-r from-primary to-secondary opacity-30 rounded-full"></div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/2 left-0 w-24 h-24 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl"></div>
      </section>

      {/* Serviços Sections */}
      {servicosState.map((servico, index) => (
        <ServicoSection 
          key={servico.id} 
          servico={servico} 
          index={index}
          onEdit={handleEdit}
        />
      ))}

      {/* Editor Modal */}
      {currentService && (
        <ImageEditor
          images={currentService.imagens}
          onSave={(images) => handleSave(currentService.id, images)}
          onCancel={() => setEditingService(null)}
          title={`Editar imagens - ${currentService.titulo}`}
          description="Adicione ou remova imagens do carrossel. As imagens devem ter proporção 4:3 para melhor visualização."
        />
      )}
    </div>
  );
} 
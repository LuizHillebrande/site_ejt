"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function ServicosContent() {
  const [activeTab, setActiveTab] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const tabs = [
    {
      title: "Consultoria Empresarial",
      emoji: "💼",
      content: "Detectamos problemas administrativos e oferecemos soluções através de conhecimento especializado, desenvolvendo habilidades e atitudes que melhoram o desempenho da sua empresa.",
    },
    {
      title: "Marketing",
      emoji: "📈",
      content: (
        <>
          Entenda o seu ambiente de mercado, as necessidades dos clientes e destaque-se da concorrência. Serviços incluem:
          <ul className="mt-2 space-y-1 list-disc list-inside">
            <li>Cliente Oculto</li>
            <li>Grupo Focal</li>
            <li>Pesquisa de Mercado e Opinião</li>
            <li>Plano de Marketing</li>
          </ul>
        </>
      ),
    },
    {
      title: "Finanças",
      emoji: "💰",
      content: (
        <>
          Planeje, controle e organize dados financeiros para tomar melhores decisões. Oferecemos:
          <ul className="mt-2 space-y-1 list-disc list-inside">
            <li>Planejamento Financeiro</li>
            <li>Análise de Custo e Preço de Venda</li>
            <li>Viabilidade Econômico Financeira</li>
            <li>Diagnóstico Econômico Financeiro</li>
          </ul>
        </>
      ),
    },
    {
      title: "Recursos Humanos",
      emoji: "👥",
      content: (
        <>
          Implemente práticas e políticas efetivas para seus colaboradores. Serviços incluem:
          <ul className="mt-2 space-y-1 list-disc list-inside">
            <li>Descrição e Análise de Cargos</li>
            <li>Plano de Carreira</li>
            <li>Pesquisa Salarial</li>
            <li>Pesquisa de Clima Organizacional</li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <section className="py-20 bg-secondary/5" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl font-bold text-dark mb-12 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            Nossos Serviços de Consultoria
          </motion.h2>
          
          {/* Tabs Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            {tabs.map((tab, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2
                  ${activeTab === index 
                    ? 'bg-primary text-white shadow-lg scale-105' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                whileHover={{ scale: activeTab === index ? 1.05 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-xl">{tab.emoji}</span>
                {tab.title}
              </motion.button>
            ))}
          </motion.div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">{tabs[activeTab].emoji}</span>
              <h3 className="text-2xl font-bold text-gray-900">{tabs[activeTab].title}</h3>
            </div>
            <div className="text-gray-600 leading-relaxed">
              {tabs[activeTab].content}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 
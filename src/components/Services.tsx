"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const services = [
  {
    title: "Consultoria Empresarial",
    description: "Desenvolvemos estratégias personalizadas para otimizar processos e aumentar a eficiência do seu negócio.",
    examples: [
      "Gestão de Processos",
      "Planejamento Estratégico",
      "Análise de Indicadores",
      "Otimização Operacional"
    ]
  },
  {
    title: "Finanças",
    description: "Possibilita à empresa planejar, controlar e organizar os dados financeiros a fim de que gerem informações que sirvam de base para a tomada de decisão.",
    examples: [
      "Planejamento Financeiro",
      "Análise de Custo e Preço de Venda",
      "Viabilidade Econômico Financeira",
      "Diagnóstico Econômico Financeiro"
    ]
  },
  {
    title: "Marketing Digital",
    description: "Implementamos estratégias de marketing digital para aumentar sua presença online e atrair mais clientes.",
    examples: [
      "Cliente Oculto",
      "Grupo Focal",
      "Pesquisa de Mercado e Opinião",
      "Plano de Marketing"
    ]
  },
];

export default function Services() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  return (
    <>
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-12">Nossos Serviços</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  onClick={() => setSelectedService(service)}
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                >
                  <h3 className="text-xl font-semibold mb-4 text-primary">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex items-center">
                    <div className="flex-1 h-[1px] bg-gray-200"></div>
                    <span className="text-primary text-sm font-medium px-3">
                      Clique para ver exemplos
                    </span>
                    <div className="flex-1 h-[1px] bg-gray-200"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <Dialog
        open={selectedService !== null}
        onClose={() => setSelectedService(null)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-lg w-full bg-white rounded-2xl shadow-lg">
            {selectedService && (
              <>
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <Dialog.Title className="text-2xl font-bold text-gray-900">
                    {selectedService.title}
                  </Dialog.Title>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="text-gray-400 hover:text-gray-500 transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 mb-6">
                    {selectedService.description}
                  </p>
                  
                  {selectedService.examples.length > 0 && (
                    <>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">
                        Exemplos de Serviços
                      </h4>
                      <ul className="space-y-3">
                        {selectedService.examples.map((example, index) => (
                          <motion.li
                            key={example}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-3 text-gray-700"
                          >
                            <span className="w-2 h-2 bg-primary rounded-full" />
                            {example}
                          </motion.li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
} 
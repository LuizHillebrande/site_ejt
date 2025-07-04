"use client";
import { motion } from "framer-motion";

const services = [
  {
    title: "Consultoria Empresarial",
    description: "Desenvolvemos estratégias personalizadas para otimizar processos e aumentar a eficiência do seu negócio.",
  },
  {
    title: "Desenvolvimento Web",
    description: "Criamos sites e aplicações web modernas e responsivas, utilizando as mais recentes tecnologias do mercado.",
  },
  {
    title: "Marketing Digital",
    description: "Implementamos estratégias de marketing digital para aumentar sua presença online e atrair mais clientes.",
  },
];

export default function Services() {
  return (
    <section id="servicos" className="bg-white py-24">
      <div className="container">
        <motion.h2
          className="text-3xl md:text-4xl font-sans font-bold text-primary text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Nossos Serviços
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              className="bg-background rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
            >
              <h3 className="font-sans text-xl font-bold text-primary mb-4">{service.title}</h3>
              <p className="text-gray-700 text-lg">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 
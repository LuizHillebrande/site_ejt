"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const consultoriasEmpresas = [
  {
    title: "Finanças",
    description: "Análise financeira, planejamento orçamentário, gestão de custos e consultoria para otimização de recursos e resultados.",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
      </svg>
    ),
    image: "/images/servicos/consultoria_1.png"
  },
  {
    title: "RH",
    description: "Recrutamento e seleção, desenvolvimento de pessoas, avaliação de desempenho e cultura organizacional.",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
      </svg>
    ),
    image: "/images/servicos/consultoria_2.png"
  },
  {
    title: "Marketing",
    description: "Marketing digital, branding, gestão de mídias sociais e desenvolvimento de estratégias de comunicação.",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6.59-6.59 4 4 6.3-6.29L22 12V6z"/>
      </svg>
    )
  },
  {
    title: "Estratégia",
    description: "Planejamento estratégico, análise de mercado, gestão de projetos e desenvolvimento de novos negócios.",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z"/>
      </svg>
    )
  }
];

const eventos = [
  {
    title: "Eventos Corporativos",
    description: "Organização e gestão de eventos empresariais, workshops, treinamentos e palestras personalizadas.",
    image: "/images/servicos/eventos_1.png"
  },
  {
    title: "Eventos Acadêmicos",
    description: "Planejamento e execução de congressos, seminários e eventos voltados para a comunidade acadêmica.",
    image: "/images/servicos/eventos_2.png"
  }
];

const acaoSocial = [
  {
    title: "Projetos Sociais",
    description: "Desenvolvimento e implementação de projetos de impacto social e sustentabilidade.",
    image: "/images/servicos/acao_social_1.png"
  },
  {
    title: "Voluntariado",
    description: "Programas de voluntariado corporativo e ações comunitárias.",
    image: "/images/servicos/acao_social_2.png"
  },
  {
    title: "Educação",
    description: "Iniciativas educacionais e de capacitação para comunidades.",
    image: "/images/servicos/acao_social_3.png"
  }
];

const ConsultingCard = ({ service, index }: { service: any; index: number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      {service.image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="text-primary p-2 rounded-full bg-primary/10 group-hover:scale-110 transition-transform duration-300">
            {service.icon}
          </div>
          <h3 className="text-xl font-bold text-gray-900 ml-3">{service.title}</h3>
        </div>
        <p className="text-gray-600">{service.description}</p>
      </div>
    </motion.div>
  );
};

const ServiceCard = ({ service, index }: { service: any; index: number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      <div className="p-6 bg-white">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
        <p className="text-gray-600">{service.description}</p>
      </div>
    </motion.div>
  );
};

export default function ServicosPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Nossos Serviços
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Oferecemos soluções completas e personalizadas para impulsionar o crescimento do seu negócio
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {consultoriasEmpresas.map((service, index) => (
              <ConsultingCard key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Eventos Section */}
      <section className="relative py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Eventos
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Planejamento e execução de eventos corporativos e acadêmicos com excelência
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {eventos.map((evento, index) => (
              <ServiceCard key={evento.title} service={evento} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Ação Social Section */}
      <section className="relative py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ação Social
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Compromisso com a responsabilidade social e desenvolvimento sustentável
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {acaoSocial.map((acao, index) => (
              <ServiceCard key={acao.title} service={acao} index={index} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
} 
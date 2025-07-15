"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import NAFCarousel from "@/components/NAFCarousel";
import CountUp from "react-countup";

const services = [
  {
    title: "Regularização do CPF",
    description: "Auxílio na regularização do CPF e situação cadastral na Receita Federal",
    icon: "document",
    stat: "500+"
  },
  {
    title: "Declaração do IRPF",
    description: "Suporte na declaração do Imposto de Renda para Pessoas Físicas",
    icon: "tax",
    stat: "300+"
  },
  {
    title: "Apoio ao MEI",
    description: "Orientação e suporte para Microempreendedores Individuais",
    icon: "business",
    stat: "200+"
  },
  {
    title: "Certidão Negativa",
    description: "Emissão e consulta de Certidão Negativa de Débitos (CND)",
    icon: "certificate",
    stat: "150+"
  },
  {
    title: "Parcelamentos",
    description: "Orientação sobre parcelamentos de débitos fiscais",
    icon: "calculator",
    stat: "100+"
  },
  {
    title: "Documentos Fiscais",
    description: "Auxílio para a obtenção de documentos fiscais",
    icon: "folder",
    stat: "400+"
  }
];

const benefits = [
  {
    title: "Para os estudantes",
    description: "Oportunidade de prática profissional e aprendizado com casos reais",
    icon: "🎓",
    stat: "50+"
  },
  {
    title: "Para a comunidade",
    description: "Acesso gratuito a serviços contábeis e fiscais de qualidade",
    icon: "🤝",
    stat: "1000+"
  },
  {
    title: "Para a sociedade",
    description: "Estímulo à cidadania fiscal e à regularização tributária",
    icon: "🌟",
    stat: "2000+"
  }
];

const stats = [
  { label: "Atendimentos Realizados", value: 2000, suffix: "+" },
  { label: "Clientes Satisfeitos", value: 98, suffix: "%" },
  { label: "Alunos Capacitados", value: 50, suffix: "+" },
  { label: "Horas de Atendimento", value: 5000, suffix: "+" }
];

export default function NAFPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const cardHoverVariants = {
    hover: {
      y: -5,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <main className="pt-0">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-secondary text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10" />
        <motion.div 
          className="absolute -right-40 -bottom-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <div className="container relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div
              className="w-40 h-40 mx-auto mb-6 relative bg-white rounded-2xl p-4 shadow-xl"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
              }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src="/images/naf/logo-naf.png"
                alt="Logo NAF"
                fill
                className="object-contain p-2"
                priority
              />
            </motion.div>
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8"
              variants={itemVariants}
            >
              <motion.h1 
                className="text-3xl md:text-4xl font-bold mb-4"
                variants={itemVariants}
              >
                Núcleo de Apoio Contábil e Fiscal (NAF)
              </motion.h1>
              <motion.p 
                className="text-base md:text-lg text-white/90"
                variants={itemVariants}
              >
                Suporte gratuito em questões contábeis e fiscais para quem mais precisa
              </motion.p>
            </motion.div>

            {/* Stats Section */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
              variants={containerVariants}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-4 bg-white rounded-xl shadow-lg transform transition-all duration-300"
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255, 255, 255, 1)"
                  }}
                >
                  <div className="text-2xl font-bold mb-1 text-primary">
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      suffix={stat.suffix}
                      enableScrollSpy
                      scrollSpyOnce
                    />
                  </div>
                  <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About NAF Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold text-primary mb-6">O que é o NAF?</h2>
              <p className="text-gray-700 mb-4">
                O Núcleo de Apoio Contábil e Fiscal (NAF) é um projeto desenvolvido em parceria com a Receita Federal para oferecer suporte gratuito à população de baixa renda, microempreendedores e entidades sem fins lucrativos em questões contábeis e fiscais.
              </p>
              <p className="text-gray-700">
                Nosso objetivo é unir teoria e prática, proporcionando aos alunos da Toledo uma experiência real de atendimento ao público, enquanto contribuímos para a educação fiscal e a regularização de empresas e cidadãos.
              </p>
            </motion.div>
            <motion.div 
              className="relative h-[400px] rounded-xl overflow-hidden shadow-xl"
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <Image
                src="/images/naf/logo-naf.png"
                alt="Logo NAF"
                fill
                className="object-contain p-8 bg-white"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 
              className="text-3xl font-bold text-primary mb-4"
              variants={itemVariants}
            >
              Nossos Serviços
            </motion.h2>
            <motion.p 
              className="text-gray-700 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              No NAF, oferecemos diversos atendimentos gratuitos para a comunidade
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow relative overflow-hidden group"
                variants={itemVariants}
                whileHover="hover"
                animate={cardHoverVariants}
              >
                <div className="absolute top-0 right-0 bg-primary/10 text-primary font-bold py-1 px-3 rounded-bl-lg">
                  <CountUp
                    end={parseInt(service.stat)}
                    duration={2}
                    suffix="+"
                    enableScrollSpy
                    scrollSpyOnce
                  />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3 group-hover:text-secondary transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 
              className="text-3xl font-bold text-primary mb-6"
              variants={itemVariants}
            >
              Como Funciona o Atendimento?
            </motion.h2>
            <motion.p 
              className="text-gray-700 mb-8"
              variants={itemVariants}
            >
              Os atendimentos são realizados pelos alunos da Toledo, sob a supervisão de professores e profissionais qualificados. Para ser atendido, basta agendar um horário através dos nossos canais de contato ou comparecer em nosso local de atendimento durante o expediente.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 
              className="text-3xl font-bold text-primary mb-4"
              variants={itemVariants}
            >
              Benefícios do NAF
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all relative overflow-hidden group"
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-primary mb-3 group-hover:text-secondary transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
                <div className="absolute top-4 right-4 text-primary/80 font-bold">
                  <CountUp
                    end={parseInt(benefit.stat)}
                    duration={2}
                    suffix="+"
                    enableScrollSpy
                    scrollSpyOnce
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Image Carousel Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 
              className="text-3xl font-bold text-primary mb-4"
              variants={itemVariants}
            >
              Inauguração do NAF
            </motion.h2>
          </motion.div>
          
          <NAFCarousel />
        </div>
      </section>
    </main>
  );
} 
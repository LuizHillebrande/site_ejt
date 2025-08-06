"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <section id="sobre" className="py-24 bg-background">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[400px] rounded-xl overflow-hidden"
          >
            <Image
              src="/images/logos/logo-completa.png"
              alt="Logo Completa"
              fill
              className="object-cover"
            />
          </motion.div>

          <div className="space-y-6">
            <motion.h2
              className="text-3xl md:text-4xl font-sans font-bold text-primary"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Quem Somos
            </motion.h2>

            <motion.p
              className="text-lg text-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              A Empresa Júnior Toledo (EJT) é uma associação civil sem fins lucrativos,
              formada e gerida por alunos do curso de Sistemas de Informação do
              Centro Universitário Toledo.
            </motion.p>

            <motion.p
              className="text-lg text-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Nossa missão é proporcionar aos alunos a experiência prática do
              mercado de trabalho, desenvolvendo projetos de tecnologia e
              consultoria para empresas da região, sempre com foco na qualidade e
              inovação.
            </motion.p>

            <motion.div
              className="grid grid-cols-2 gap-6 mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-center p-4 bg-white rounded-lg shadow-md">
                <h3 className="text-4xl font-bold text-primary mb-2">50+</h3>
                <p className="text-gray-600">Projetos Realizados</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-md">
                <h3 className="text-4xl font-bold text-primary mb-2">100%</h3>
                <p className="text-gray-600">Clientes Satisfeitos</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
} 
"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica de envio do formulário
    console.log("Formulário enviado:", formData);
  };

  return (
    <section id="contato" className="py-24 bg-primary text-white">
      <div className="container">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-sans font-bold mb-4">
            Entre em Contato
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Tem um projeto em mente? Quer saber mais sobre nossos serviços?
            Preencha o formulário abaixo e entraremos em contato em até 24 horas.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-2">
                Nome Completo
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-gray-700"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-gray-700"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="phone" className="block text-gray-700 mb-2">
              Telefone
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-gray-700"
              required
            />
          </div>

          <div className="mt-6">
            <label htmlFor="message" className="block text-gray-700 mb-2">
              Mensagem
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-gray-700"
              required
            ></textarea>
          </div>

          <motion.button
            type="submit"
            className="mt-8 w-full bg-primary text-white py-3 px-6 rounded-lg font-bold hover:bg-primary/90 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Enviar Mensagem
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
} 
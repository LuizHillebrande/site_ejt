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

  const [focused, setFocused] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica de envio do formulário
    console.log("Formulário enviado:", formData);
  };

  const inputVariants = {
    focused: { scale: 1.02, transition: { duration: 0.2 } },
    unfocused: { scale: 1, transition: { duration: 0.2 } }
  };

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

  return (
    <section id="contato" className="py-16 bg-gradient-to-br from-primary to-primary/90 text-white">
      <div className="container max-w-4xl mx-auto px-4">
        <motion.div
          className="text-center mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-3xl font-bold mb-2"
            variants={itemVariants}
          >
            Vamos Conversar?
          </motion.h2>
          <motion.p 
            className="text-white/80 text-lg"
            variants={itemVariants}
          >
            Conte-nos sobre seu projeto
          </motion.p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div variants={itemVariants}>
              <motion.input
                type="text"
                placeholder="Nome"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused("")}
                variants={inputVariants}
                animate={focused === "name" ? "focused" : "unfocused"}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 focus:border-white/40 focus:outline-none transition-colors placeholder:text-white/50"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused("")}
                variants={inputVariants}
                animate={focused === "email" ? "focused" : "unfocused"}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 focus:border-white/40 focus:outline-none transition-colors placeholder:text-white/50"
                required
              />
            </motion.div>
          </div>

          <motion.div className="mt-4" variants={itemVariants}>
            <motion.input
              type="tel"
              placeholder="Telefone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              onFocus={() => setFocused("phone")}
              onBlur={() => setFocused("")}
              variants={inputVariants}
              animate={focused === "phone" ? "focused" : "unfocused"}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 focus:border-white/40 focus:outline-none transition-colors placeholder:text-white/50"
              required
            />
          </motion.div>

          <motion.div className="mt-4" variants={itemVariants}>
            <motion.textarea
              placeholder="Sua mensagem"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              onFocus={() => setFocused("message")}
              onBlur={() => setFocused("")}
              variants={inputVariants}
              animate={focused === "message" ? "focused" : "unfocused"}
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 focus:border-white/40 focus:outline-none transition-colors placeholder:text-white/50 resize-none"
              required
            />
          </motion.div>

          <motion.div className="mt-6" variants={itemVariants}>
            <motion.button
              type="submit"
              className="w-full bg-white text-primary font-semibold py-3 px-6 rounded-lg hover:bg-white/90 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Enviar Mensagem
            </motion.button>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
} 
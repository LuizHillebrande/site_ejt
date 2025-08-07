"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [focused, setFocused] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'Mensagem enviada com sucesso! Em breve entraremos em contato.'
        });
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error(data.error || 'Erro ao enviar mensagem');
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Erro ao enviar mensagem'
      });
    } finally {
      setIsLoading(false);
    }
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

        {status.type && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg text-center ${
              status.type === 'success' ? 'bg-green-500/20' : 'bg-red-500/20'
            }`}
          >
            {status.message}
          </motion.div>
        )}

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
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </motion.div>
          </div>

          <motion.div className="mt-4" variants={itemVariants}>
            <motion.input
              type="text"
              placeholder="Assunto"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              onFocus={() => setFocused("subject")}
              onBlur={() => setFocused("")}
              variants={inputVariants}
              animate={focused === "subject" ? "focused" : "unfocused"}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 focus:border-white/40 focus:outline-none transition-colors placeholder:text-white/50"
              required
              disabled={isLoading}
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
              disabled={isLoading}
            />
          </motion.div>

          <motion.div className="mt-6" variants={itemVariants}>
            <motion.button
              type="submit"
              className={`w-full font-semibold py-3 px-6 rounded-lg transition-colors ${
                isLoading
                  ? 'bg-white/50 text-primary/50 cursor-not-allowed'
                  : 'bg-white text-primary hover:bg-white/90'
              }`}
              whileHover={!isLoading ? { scale: 1.02 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
              disabled={isLoading}
            >
              {isLoading ? 'Enviando...' : 'Enviar Mensagem'}
            </motion.button>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
} 
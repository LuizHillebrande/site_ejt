"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Verificar se já está logado ao carregar a página
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      router.replace("/admin/dashboard");
    }
  }, [router]);

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    alert("Por favor, entre em contato com o administrador do sistema para redefinir sua senha.");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Tentando fazer login...");
    console.log("Usuário:", username);
    
    setError("");
    setIsLoading(true);

    try {
      console.log("Verificando credenciais...");
      if (username === "admin" && password === "ejt2024") {
        console.log("Credenciais corretas");
        
        // Salvar token primeiro
        localStorage.setItem("adminToken", "logged_in");
        console.log("Token salvo");

        // Pequeno delay para garantir que o token foi salvo
        await new Promise(resolve => setTimeout(resolve, 100));

        // Tentar redirecionamento de diferentes formas
        try {
          console.log("Tentando redirecionamento com replace...");
          await router.replace("/admin/dashboard");
        } catch (redirectError) {
          console.error("Erro no replace, tentando push...", redirectError);
          try {
            await router.push("/admin/dashboard");
          } catch (pushError) {
            console.error("Erro no push, tentando window.location...", pushError);
            window.location.href = "/admin/dashboard";
          }
        }
      } else {
        console.log("Credenciais inválidas!");
        setError("Credenciais inválidas");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Erro durante o login:", err);
      setError("Erro ao fazer login. Tente novamente.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-background relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute -top-20 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute -bottom-20 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
      />
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: -80, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-96 relative z-10 border border-white/20"
      >
        <motion.div 
          className="flex justify-center mb-8"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src="/images/logos/logo-principal.png"
            alt="Logo EJT"
            width={150}
            height={50}
            className="h-auto"
          />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-center mb-6 text-dark"
        >
          Área Administrativa
        </motion.h1>
        {error && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-red-100/80 backdrop-blur border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4"
          >
            {error}
          </motion.div>
        )}
        <motion.form 
          onSubmit={handleLogin} 
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div>
            <label className="block text-dark font-medium mb-2">
              Usuário
            </label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/50 backdrop-blur border border-gray-200 
                       focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none 
                       transition-all duration-300"
              placeholder="Digite seu usuário"
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-dark font-medium mb-2">
              Senha
            </label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/50 backdrop-blur border border-gray-200 
                       focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none 
                       transition-all duration-300"
              placeholder="Digite sua senha"
              disabled={isLoading}
            />
          </div>
          <div className="flex flex-col gap-3">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 
                       focus:ring-primary/50 transform transition-all duration-300
                       ${isLoading 
                         ? 'bg-gray-400 cursor-not-allowed' 
                         : 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg'}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                  />
                </div>
              ) : (
                'Entrar'
              )}
            </motion.button>
            
            <motion.button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-primary hover:text-secondary transition-colors duration-300"
            >
              Esqueceu sua senha?
            </motion.button>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default function LoginPage() {
  return <LoginForm />;
} 
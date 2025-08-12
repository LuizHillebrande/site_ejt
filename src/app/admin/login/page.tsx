"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const adminUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    if (!adminUsername || !adminPassword) {
      setError("Erro na configuração do sistema. Contate o administrador.");
      return;
    }

    if (username === adminUsername && password === adminPassword) {
      // Configura o cookie com uma data de expiração e flags de segurança
      const date = new Date();
      date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000)); // 7 dias
      document.cookie = `adminToken=logged_in; path=/; expires=${date.toUTCString()}; SameSite=Strict`;
      
      // Limpa os campos
      setUsername("");
      setPassword("");
      setError("");
      
      // Redireciona após um pequeno delay para garantir que o cookie foi definido
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 100);
    } else {
      setError("Usuário ou senha inválidos");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="text-center mb-6">
          <Image
            src="/images/logos/logo-principal.png"
            alt="Logo"
            width={150}
            height={50}
            className="mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-900">Área Administrativa</h1>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-medium mb-2">
              Usuário
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
} 
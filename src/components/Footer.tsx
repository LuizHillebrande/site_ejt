"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Image
              src="/images/logos/logo-azul.png"
              alt="Logo EJT"
              width={150}
              height={50}
              className="h-auto w-32 rounded-lg transition-all duration-300 hover:brightness-110"
            />
          </div>
          
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-4">Contato</h3>
            <p className="mb-2">Email: empresajrtoledo@gmail.com</p>
            <p>Telefone: (14) 99999-9999</p>
          </div>

          <div className="mt-6 md:mt-0">
            <h3 className="text-xl font-semibold mb-4">Endereço</h3>
            <p className="text-center md:text-left">
              Rua Alvino Gomes Teixeira, 340<br />
              Presidente Prudente - SP<br />
              CEP: 19030-440
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-center border-t border-gray-700 pt-4">
          <p>&copy; {new Date().getFullYear()} Empresa Júnior Toledo. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
} 
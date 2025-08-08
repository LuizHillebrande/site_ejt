"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Footer() {
  const router = useRouter();
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

  useEffect(() => {
    // Reset click count after 500ms
    const timer = setTimeout(() => {
      setClickCount(0);
    }, 500);

    return () => clearTimeout(timer);
  }, [clickCount]);

  const handleMouseDown = () => {
    const timer = setTimeout(() => {
      router.push('/admin/login');
    }, 1000); // 1 segundo de pressionar
    setPressTimer(timer);
  };

  const handleMouseUp = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  };

  const handleClick = () => {
    const currentTime = new Date().getTime();
    if (currentTime - lastClickTime < 300) { // Duplo clique em 300ms
      router.push('/admin/login');
      setClickCount(0);
    } else {
      setClickCount(prev => prev + 1);
      setLastClickTime(currentTime);
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div 
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onClick={handleClick}
              className="cursor-default select-none"
            >
              <Image
                src="/images/logos/logo-azul.png"
                alt="Logo EJT"
                width={150}
                height={50}
                className="h-auto w-32 rounded-lg transition-all duration-300 hover:brightness-110"
                draggable={false}
              />
            </div>
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
"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  type: 'bot' | 'user';
  text: string;
}

interface Option {
  text: string;
  nextOptions: Option[];
  response: string;
}

const chatOptions: Option[] = [
  {
    text: "Quero conhecer os serviços",
    response: "Oferecemos os seguintes serviços:",
    nextOptions: [
      {
        text: "Ação Social",
        response: "Nossa área de Ação Social desenvolve projetos que impactam positivamente a comunidade, incluindo distribuição de alimentos e atividades com idosos e crianças.",
        nextOptions: []
      },
      {
        text: "Pesquisas de Campo",
        response: "Realizamos pesquisas nas ruas para entender melhor as necessidades da comunidade e do mercado local, auxiliando empresas e a sociedade com dados relevantes.",
        nextOptions: []
      },
      {
        text: "Eventos Acadêmicos",
        response: "Organizamos eventos exclusivos dentro da faculdade com vagas limitadas, proporcionando experiências únicas para os alunos.",
        nextOptions: []
      }
    ]
  },
  {
    text: "Informações de contato",
    response: "Como podemos ajudar?",
    nextOptions: [
      {
        text: "Endereço",
        response: "Estamos localizados na Rua Alvino Gomes Teixeira, 340, Presidente Prudente - SP, CEP: 19030-440",
        nextOptions: []
      },
      {
        text: "Telefone/Email",
        response: "Entre em contato através do email: empresajrtoledo@gmail.com ou pelo telefone (18) 99804-3480",
        nextOptions: []
      }
    ]
  },
  {
    text: "Projetos especiais",
    response: "Conheça nossos projetos especiais:",
    nextOptions: [
      {
        text: "NAF",
        response: "O NAF (Núcleo de Apoio Contábil e Fiscal) oferece suporte gratuito à população de baixa renda, microempreendedores e entidades sem fins lucrativos em questões contábeis e fiscais. Serviços incluem: regularização de CPF, declaração de IRPF, apoio ao MEI, emissão de certidões e muito mais.",
        nextOptions: []
      },
      {
        text: "IPT",
        response: "O Índice de Preços Toledo (IPT) é uma pesquisa de variação de preços da cesta básica, realizada mensalmente pela EJT desde 1994. Monitoramos os preços em Presidente Prudente, gerando relatórios mensais sobre inflação e tendências econômicas.",
        nextOptions: []
      }
    ]
  },
  {
    text: "Sobre a EJT",
    response: "A Empresa Júnior Toledo é focada em desenvolver soluções e formar líderes através de projetos práticos e impactantes. Desde 1994, atuamos com projetos sociais, pesquisas e eventos que beneficiam tanto a comunidade acadêmica quanto a sociedade.",
    nextOptions: []
  }
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentOptions, setCurrentOptions] = useState(chatOptions);
  const [showBubble, setShowBubble] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        { 
          type: 'bot' as const, 
          text: "Olá! Sou o assistente da EJT. Como posso ajudar você hoje?" 
        }
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleOptionClick = (option: Option) => {
    const newMessages = [
      ...messages,
      { type: 'user' as const, text: option.text },
      { type: 'bot' as const, text: option.response }
    ];
    setMessages(newMessages);
    setCurrentOptions(option.nextOptions);

    if (option.nextOptions.length === 0) {
      setTimeout(() => {
        setCurrentOptions(chatOptions);
      }, 1000);
    }
  };

  return (
    <>
      {/* Botão do chatbot com balão de fala */}
      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 flex items-center gap-3">
        {showBubble && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-white rounded-lg shadow-lg p-3 relative"
          >
            <div className="text-dark text-sm whitespace-nowrap">Posso te ajudar?</div>
            <div className="absolute top-1/2 right-[-8px] w-4 h-4 bg-white transform rotate-45 -translate-y-1/2"></div>
          </motion.div>
        )}
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsOpen(!isOpen);
            setShowBubble(false);
          }}
          className="bg-primary rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
        >
          <div className="relative w-[45px] h-[45px] md:w-[60px] md:h-[60px]">
            <Image
              src="/images/robo/robozinho.png"
              alt="Chatbot"
              fill
              className="rounded-full object-contain"
              sizes="(max-width: 768px) 45px, 60px"
            />
          </div>
        </motion.button>
      </div>

      {/* Janela do chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-16 right-4 md:bottom-24 md:right-8 w-[calc(100vw-2rem)] md:w-96 max-w-[96vw] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header do chat */}
            <div className="bg-primary p-3 md:p-4 flex items-center gap-3">
              <div className="relative w-8 h-8 md:w-10 md:h-10">
                <Image
                  src="/images/robo/robozinho.png"
                  alt="Chatbot"
                  fill
                  className="rounded-full object-contain"
                  sizes="(max-width: 768px) 32px, 40px"
                />
              </div>
              <div className="text-white">
                <h3 className="font-bold text-sm md:text-base">Assistente EJT</h3>
                <p className="text-xs md:text-sm opacity-90">Online</p>
              </div>
            </div>

            {/* Área de mensagens */}
            <div className="h-[50vh] md:h-96 overflow-y-auto p-3 md:p-4 bg-gray-50">
              <div className="flex flex-col space-y-3 md:space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-3 py-2 md:px-4 md:py-2 text-sm ${
                        message.type === 'user'
                          ? 'bg-primary text-white'
                          : 'bg-white shadow-md'
                      }`}
                    >
                      {message.text}
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Área de opções */}
            <div className="p-3 md:p-4 bg-white border-t">
              <div className="flex flex-col gap-2">
                {currentOptions.map((option, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleOptionClick(option)}
                    className="w-full px-3 py-2 md:px-4 md:py-2 text-left rounded-lg bg-gray-50 hover:bg-primary hover:text-white transition-colors duration-200 text-sm"
                  >
                    {option.text}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 
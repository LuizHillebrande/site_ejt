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
        response: "Estamos localizados na Praça Raul Furquim, 9-31, Vila Universitária, Bauru - SP, CEP: 17012-020",
        nextOptions: []
      },
      {
        text: "Telefone/Email",
        response: "Entre em contato através do email: contato@ejt.com.br ou pelo telefone (14) 99999-9999",
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
      <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3">
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
          className="bg-primary rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
        >
          <Image
            src="/images/robo/robozinho.png"
            alt="Chatbot"
            width={60}
            height={60}
            className="rounded-full"
          />
        </motion.button>
      </div>

      {/* Janela do chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-8 w-96 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header do chat */}
            <div className="bg-primary p-4 flex items-center gap-3">
              <Image
                src="/images/robo/robozinho.png"
                alt="Chatbot"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="text-white">
                <h3 className="font-bold">Assistente EJT</h3>
                <p className="text-sm opacity-90">Online</p>
              </div>
            </div>

            {/* Área de mensagens */}
            <div className="h-96 overflow-y-auto p-4 bg-gray-50">
              <div className="flex flex-col space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
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
            <div className="p-4 bg-white border-t">
              <div className="flex flex-col gap-2">
                {currentOptions.map((option, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleOptionClick(option)}
                    className="w-full px-4 py-2 text-left rounded-lg bg-gray-50 hover:bg-primary hover:text-white transition-colors duration-200 text-sm"
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
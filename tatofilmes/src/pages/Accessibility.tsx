import React from 'react';
import { motion } from 'framer-motion';
import { Ear, Eye, Heart, RefreshCw, Accessibility as AccessibilityIcon } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';

const Accessibility = () => {
  const features = [
    {
      icon: <AccessibilityIcon className="h-10 w-10 text-accent-red" />,
      title: "Acessibilidade Física",
      description: "Nossas instalações são totalmente acessíveis, com rampas de acesso, elevadores, assentos exclusivos para cadeirantes e banheiros adaptados em todos os nossos complexos."
    },
    {
      icon: <Ear className="h-10 w-10 text-accent-red" />,
      title: "Recursos para Deficientes Auditivos",
      description: "Oferecemos legendas em português para filmes estrangeiros e nacionais, além de dispositivos de legendagem individual e intérpretes de LIBRAS em eventos especiais."
    },
    {
      icon: <Eye className="h-10 w-10 text-accent-red" />,
      title: "Recursos para Deficientes Visuais",
      description: "Disponibilizamos sessions com audiodescrição, sinalização em Braille nas instalações e permitimos a entrada de cães-guia em todas as áreas do cinema."
    },
    {
      icon: <Heart className="h-10 w-10 text-accent-red" />,
      title: "Sessões Adaptadas",
      description: "Realizamos sessões com volumes reduzidos e luzes parcialmente acesas para pessoas com autismo e outras condições que requerem ambientes sensoriais adaptados."
    }
  ];

  const sessions = [
    {
      title: "Sessão com Audiodescrição",
      day: "Quintas-feiras",
      time: "15h e 19h"
    },
    {
      title: "Sessão com Intérprete de LIBRAS",
      day: "Segundas-feiras",
      time: "17h"
    },
    {
      title: "Sessão Adaptada para Autismo",
      day: "Domingos",
      time: "10h"
    }
  ];

  return (
    <PageLayout 
      title="Acessibilidade" 
      subtitle="Nosso compromisso é garantir que o cinema seja uma experiência inclusiva para todos"
      bgImageUrl="https://source.unsplash.com/random/1920x1080/?inclusive,accessibility"
    >
      <div className="mb-16">
        <motion.h2 
          className="heading-sm text-cinema-900 dark:text-white text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Recursos de Acessibilidade
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-white dark:bg-cinema-900 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-800 flex gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <div className="flex-shrink-0">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-cinema-900 dark:text-white">{feature.title}</h3>
                <p className="text-cinema-600 dark:text-cinema-300">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div 
        className="bg-cinema-50 dark:bg-cinema-900 rounded-xl p-8 mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="heading-sm text-cinema-900 dark:text-white text-center mb-8">Sessões Especiais</h2>
          
          <div className="grid sm:grid-cols-3 gap-6">
            {sessions.map((session, index) => (
              <div key={index} className="bg-white dark:bg-cinema-800 rounded-lg shadow-md p-6 text-center">
                <h3 className="text-lg font-semibold text-accent-red mb-3">{session.title}</h3>
                <p className="text-cinema-600 dark:text-cinema-300">{session.day}</p>
                <p className="text-cinema-900 dark:text-white font-bold">{session.time}</p>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-6">
            <p className="text-sm text-cinema-600 dark:text-cinema-400 flex items-center">
              <RefreshCw className="h-4 w-4 mr-2" />
              Programação atualizada semanalmente
            </p>
          </div>
        </div>
      </motion.div>

      <div className="mb-16">
        <motion.h2 
          className="heading-sm text-cinema-900 dark:text-white text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Compromisso com a Inclusão
        </motion.h2>
        
        <motion.div 
          className="bg-white dark:bg-cinema-900 p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-cinema-700 dark:text-cinema-300 mb-4">
            No TatoFilmes, acreditamos que o cinema é para todos. Estamos continuamente trabalhando para eliminar 
            barreiras e tornar nossas instalações e serviços mais acessíveis. Nossa equipe recebe treinamento 
            regular sobre práticas inclusivas e está sempre pronta para ajudar.
          </p>
          
          <p className="text-cinema-700 dark:text-cinema-300 mb-4">
            Nosso comitê de acessibilidade, composto por especialistas e membros da comunidade, avalia regularmente 
            nossas práticas e implementa melhorias contínuas. Valorizamos o feedback dos nossos clientes para aprimorar 
            nossos serviços e garantir uma experiência cinematográfica inclusiva.
          </p>
          
          <p className="text-cinema-700 dark:text-cinema-300">
            Se você tiver necessidades específicas ou sugestões sobre como podemos melhorar nossa acessibilidade, 
            entre em contato conosco. Estamos comprometidos em garantir que todos possam desfrutar da magia do cinema.
          </p>
        </motion.div>
      </div>

      <motion.div 
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <h3 className="text-xl font-semibold mb-4 text-cinema-900 dark:text-white">
          Contato para Informações de Acessibilidade
        </h3>
        <p className="text-cinema-600 dark:text-cinema-300">
          Para informações adicionais sobre nossos recursos de acessibilidade ou para solicitar acomodações especiais:
        </p>
        <p className="text-cinema-900 dark:text-white font-medium mt-2">
          Email: acessibilidade@tatofilmes.com.br<br />
          Telefone: (21) 3333-4466
        </p>
      </motion.div>
    </PageLayout>
  );
};

export default Accessibility;

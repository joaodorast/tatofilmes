
import React from 'react';
import { motion } from 'framer-motion';
import PageLayout from '@/components/layout/PageLayout';

const About = () => {
  return (
    <PageLayout 
      title="Sobre o TatoFilmes" 
      subtitle="Conheça nossa história e compromisso com a melhor experiência cinematográfica do Rio de Janeiro"
      bgImageUrl="https://source.unsplash.com/random/1920x1080/?cinema,theater"
    >
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <motion.h2 
            className="heading-md text-cinema-900 dark:text-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            Nossa História
          </motion.h2>
          
          <motion.p 
            className="text-cinema-600 dark:text-cinema-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Fundado em 2010, o TatoFilmes nasceu com a visão de redefinir a experiência de cinema no Rio de Janeiro. 
            Nossa jornada começou com uma única sala em Copacabana e, graças ao apoio do público carioca, 
            expandimos para cinco complexos de cinema premium espalhados pela cidade.
          </motion.p>
          
          <motion.p 
            className="text-cinema-600 dark:text-cinema-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Hoje, o TatoFilmes é reconhecido pela combinação única de tecnologia de ponta, conforto excepcional 
            e atendimento personalizado. Nosso compromisso com a excelência nos tornou o destino preferido dos 
            verdadeiros amantes da sétima arte no Rio.
          </motion.p>
          
          <motion.p 
            className="text-cinema-600 dark:text-cinema-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Nossa missão é proporcionar momentos inesquecíveis através de uma experiência cinematográfica imersiva 
            que vai muito além do filme. Do momento em que você entra em nossas portas até o final dos créditos, 
            cada detalhe é cuidadosamente planejado para encantar.
          </motion.p>
        </div>
        
        <motion.div 
          className="rounded-xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <img 
            src="https://source.unsplash.com/random/800x600/?cinema,movie,theater" 
            alt="Interior do TatoFilmes" 
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      <div className="mt-20">
        <motion.h2 
          className="heading-md text-cinema-900 dark:text-white text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Nossos Diferenciais
        </motion.h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Tecnologia de Última Geração",
              description: "Projetores 4K a laser e som Dolby Atmos para uma experiência audiovisual incomparável",
              icon: "🎬",
              delay: 0.8
            },
            {
              title: "Conforto Premium",
              description: "Poltronas reclináveis de couro, espaçosas e com mesa lateral para maior comodidade",
              icon: "🛋️",
              delay: 0.9
            },
            {
              title: "Gastronomia Exclusiva",
              description: "Cardápio gourmet com opções que vão muito além da tradicional pipoca",
              icon: "🍿",
              delay: 1.0
            }
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="bg-white dark:bg-cinema-900 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: item.delay }}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-cinema-900 dark:text-white">{item.title}</h3>
              <p className="text-cinema-600 dark:text-cinema-400">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-20 text-center">
        <motion.h2 
          className="heading-md text-cinema-900 dark:text-white mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          Visite-nos Hoje Mesmo
        </motion.h2>
        
        <motion.p 
          className="text-cinema-600 dark:text-cinema-300 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Experimente a magia do cinema como nunca antes. 
          O TatoFilmes espera por você com a melhor programação e uma experiência inesquecível.
        </motion.p>
      </div>
    </PageLayout>
  );
};

export default About;

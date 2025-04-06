
import React from 'react';
import { motion } from 'framer-motion';
import PageLayout from '@/components/layout/PageLayout';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const News = () => {
  const newsItems = [
    {
      id: 1,
      title: "TatoFilmes inaugura nova sala VIP em Ipanema",
      excerpt: "Nova sala de cinema premium com poltronas reclinávies e serviço de bar completo.",
      date: "2023-10-15",
      author: "Maria Silva",
      imageUrl: "https://source.unsplash.com/random/800x600/?cinema,vip",
      category: "Novidades"
    },
    {
      id: 2,
      title: "Festival de Cinema Carioca acontecerá em nossa rede",
      excerpt: "O TatoFilmes receberá as principais estreias do Festival de Cinema Carioca durante todo o mês de novembro.",
      date: "2023-09-28",
      author: "João Santos",
      imageUrl: "https://source.unsplash.com/random/800x600/?film,festival",
      category: "Eventos"
    },
    {
      id: 3,
      title: "Maratona de Filmes de Terror para o Halloween",
      excerpt: "Prepare-se para uma noite assustadora com os melhores clássicos do cinema de terror.",
      date: "2023-09-20",
      author: "Ana Ferreira",
      imageUrl: "https://source.unsplash.com/random/800x600/?horror,halloween",
      category: "Eventos"
    },
    {
      id: 4,
      title: "Novo sistema de som Dolby Atmos em todas as salas",
      excerpt: "Investimos na melhor tecnologia de áudio para proporcionar uma experiência imersiva incomparável.",
      date: "2023-09-05",
      author: "Carlos Mendes",
      imageUrl: "https://source.unsplash.com/random/800x600/?sound,dolby",
      category: "Tecnologia"
    },
    {
      id: 5,
      title: "TatoFilmes lança novo programa de fidelidade",
      excerpt: "Acumule pontos e ganhe ingressos, pipoca e outros benefícios exclusivos.",
      date: "2023-08-20",
      author: "Paula Costa",
      imageUrl: "https://source.unsplash.com/random/800x600/?loyalty,card",
      category: "Promoções"
    }
  ];

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  return (
    <PageLayout 
      title="Notícias" 
      subtitle="Fique por dentro das novidades do TatoFilmes"
      bgImageUrl="https://source.unsplash.com/random/1920x1080/?cinema,news"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {newsItems.slice(0, 2).map((item, index) => (
          <motion.article 
            key={item.id}
            className="bg-white dark:bg-cinema-900 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover transition duration-500 hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-accent-red text-white px-3 py-1 rounded-full text-sm font-medium">
                {item.category}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3 text-cinema-900 dark:text-white">
                {item.title}
              </h3>
              
              <div className="flex items-center text-cinema-600 dark:text-cinema-400 mb-4 text-sm">
                <div className="flex items-center mr-4">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(item.date)}
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {item.author}
                </div>
              </div>
              
              <p className="text-cinema-600 dark:text-cinema-300 mb-6">
                {item.excerpt}
              </p>
              
              <Button variant="outline" className="text-cinema-800 dark:text-cinema-200 group">
                Ler mais 
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.article>
        ))}
      </div>
      
      <div className="space-y-8 mb-16">
        <motion.h2 
          className="heading-md text-cinema-900 dark:text-white text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Últimas Notícias
        </motion.h2>
        
        {newsItems.slice(2).map((item, index) => (
          <motion.article 
            key={item.id}
            className="bg-white dark:bg-cinema-900 rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="md:w-1/3 aspect-video md:aspect-square relative overflow-hidden">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover transition duration-500 hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-accent-red text-white px-3 py-1 rounded-full text-sm font-medium">
                {item.category}
              </div>
            </div>
            
            <div className="p-6 md:w-2/3 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-3 text-cinema-900 dark:text-white">
                  {item.title}
                </h3>
                
                <div className="flex items-center text-cinema-600 dark:text-cinema-400 mb-4 text-sm">
                  <div className="flex items-center mr-4">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(item.date)}
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {item.author}
                  </div>
                </div>
                
                <p className="text-cinema-600 dark:text-cinema-300 mb-4">
                  {item.excerpt}
                </p>
              </div>
              
              <Button variant="link" className="text-cinema-800 dark:text-cinema-200 self-start p-0 group">
                Ler mais 
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.article>
        ))}
      </div>
      
      <div className="text-center">
        <Button variant="default" className="bg-accent-red hover:bg-accent-red/90">
          Carregar mais notícias
        </Button>
      </div>
    </PageLayout>
  );
};

export default News;

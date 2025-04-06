
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { movies, Movie } from '@/lib/data';
import { motion, AnimatePresence } from 'framer-motion';

const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Filtrar apenas filmes em exibição
  const filmesEmCartaz = movies.filter(movie => movie.status === 'now-showing').slice(0, 3);
  
  // Auto-avançar apresentação de slides
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % filmesEmCartaz.length);
        setIsTransitioning(false);
      }, 500);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [filmesEmCartaz.length]);
  
  const filmeAtual = filmesEmCartaz[currentIndex];
  
  if (!filmeAtual) return null;

  return (
    <section className="relative min-h-[85vh] md:min-h-screen overflow-hidden">
      {/* Imagem de fundo com animação */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filmeAtual.id}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background z-10" />
          <img
            src={filmeAtual.backdropUrl}
            alt={filmeAtual.title}
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* Conteúdo */}
      <div className="relative z-20 cinema-container min-h-[85vh] md:min-h-screen flex items-center pt-16 md:pt-24 pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={filmeAtual.id}
            className="max-w-3xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Badge className="mb-4 bg-accent-red border-0 text-white px-3 py-1">Em Cartaz</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4">{filmeAtual.title}</h1>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {filmeAtual.genres.map((genre, index) => (
                <Badge key={index} variant="outline" className="text-white border-white/30">
                  {genre}
                </Badge>
              ))}
            </div>
            
            <p className="text-white/90 text-base md:text-lg lg:text-xl mb-6 max-w-2xl">
              {filmeAtual.synopsis}
            </p>
            
            <div className="flex flex-wrap gap-3 md:gap-4">
              <Button asChild size="lg" className="bg-accent-red hover:bg-accent-red/90">
                <Link to={`/booking/${filmeAtual.id}`}>
                  Comprar Ingressos
                </Link>
              </Button>
              
              <Button asChild size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10 hover:border-white">
                <Link to={`/movies/${filmeAtual.id}`}>
                  Ver Detalhes
                </Link>
              </Button>
              
              {filmeAtual.trailerUrl && (
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-white hover:bg-white/10"
                  onClick={() => window.open(filmeAtual.trailerUrl, '_blank')}
                >
                  <svg 
                    className="w-5 h-5 mr-2" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M8 5V19L19 12L8 5Z" 
                      fill="currentColor" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                  Assistir Trailer
                </Button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Indicadores de slides */}
      <div className="absolute bottom-6 md:bottom-8 left-0 right-0 z-20 flex justify-center space-x-2">
        {filmesEmCartaz.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentIndex(index);
                setIsTransitioning(false);
              }, 500);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-accent-red w-8' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Gradiente sobreposto na parte inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;

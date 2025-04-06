
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { movies } from '@/lib/data';
import { ArrowRight, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const ComingSoon: React.FC = () => {
  // Filtrar filmes em breve
  const filmesEmBreve = movies
    .filter(movie => movie.status === 'coming-soon')
    .slice(0, 3);
    
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };
  
  return (
    <section className="py-12 md:py-16 bg-cinema-50 dark:bg-cinema-900">
      <div className="cinema-container">
        <div className="flex justify-between items-center mb-8 md:mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-cinema-900 dark:text-white">Em Breve</h2>
            <p className="text-cinema-600 dark:text-cinema-300 mt-2">
              Lançamentos empolgantes a caminho
            </p>
          </div>
          <Button asChild variant="ghost" className="text-cinema-700 dark:text-cinema-200">
            <Link to="/coming-soon" className="flex items-center gap-1">
              Ver Todos <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filmesEmBreve.map((movie, index) => (
            <motion.div 
              key={movie.id}
              className="bg-white dark:bg-cinema-800 rounded-xl overflow-hidden shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="aspect-video overflow-hidden relative">
                <img 
                  src={movie.backdropUrl} 
                  alt={movie.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-accent-red text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(movie.releaseDate)}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2 text-cinema-900 dark:text-white">{movie.title}</h3>
                <p className="text-cinema-600 dark:text-cinema-300 line-clamp-3 mb-4">{movie.synopsis}</p>
                <div className="flex space-x-2">
                  <Button asChild className="bg-accent-red hover:bg-accent-red/90">
                    <Link to={`/movies/${movie.id}`}>Saiba Mais</Link>
                  </Button>
                  {movie.trailerUrl && (
                    <Button 
                      variant="outline" 
                      onClick={() => window.open(movie.trailerUrl, '_blank')}
                    >
                      Ver Trailer
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComingSoon;

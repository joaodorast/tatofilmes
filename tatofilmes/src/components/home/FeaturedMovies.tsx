
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MovieCard from '@/components/ui/MovieCard';
import { movies } from '@/lib/data';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const FeaturedMovies: React.FC = () => {
  // Filtrar filmes em exibição
  const filmesEmCartaz = movies
    .filter(movie => movie.status === 'now-showing')
    .slice(0, 6);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  return (
    <section className="py-12 md:py-16 bg-white dark:bg-cinema-950">
      <div className="cinema-container">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-cinema-900 dark:text-white">Em Cartaz</h2>
            <p className="text-cinema-600 dark:text-cinema-300 mt-2">
              Assista a estes incríveis filmes nos cinemas agora
            </p>
          </div>
          <Button asChild variant="ghost" className="text-cinema-700 dark:text-cinema-200">
            <Link to="/movies" className="flex items-center gap-1">
              Ver Todos <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {filmesEmCartaz.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedMovies;

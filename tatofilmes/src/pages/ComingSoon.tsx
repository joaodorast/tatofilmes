
import React from 'react';
import { motion } from 'framer-motion';
import PageLayout from '@/components/layout/PageLayout';
import { movies } from '@/lib/data';
import { Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ComingSoon = () => {
  // Filter upcoming movies
  const upcomingMovies = movies.filter(movie => movie.status === 'coming-soon');
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  return (
    <PageLayout 
      title="Em Breve" 
      subtitle="Aguarde as próximas estreias no TatoFilmes"
      bgImageUrl="https://source.unsplash.com/random/1920x1080/?cinema,coming-soon"
    >
      <div className="space-y-12">
        {upcomingMovies.map((movie, index) => (
          <motion.div 
            key={movie.id}
            className="bg-white dark:bg-cinema-900 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="aspect-[16/9] relative overflow-hidden">
                <img 
                  src={movie.backdropUrl} 
                  alt={movie.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 bg-accent-red text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(movie.releaseDate)}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-cinema-900 dark:text-white">{movie.title}</h3>
                
                <div className="flex items-center mb-4 text-cinema-600 dark:text-cinema-300">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{movie.duration} min</span>
                  <span className="mx-2">•</span>
                  <span>{movie.rating}</span>
                </div>
                
                <p className="text-cinema-600 dark:text-cinema-300 mb-6">{movie.synopsis}</p>
                
                <div className="flex flex-wrap gap-3">
                  {movie.genres.map((genre, idx) => (
                    <span 
                      key={idx} 
                      className="bg-cinema-100 dark:bg-cinema-800 text-cinema-700 dark:text-cinema-300 px-3 py-1 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
                
                <div className="mt-6 flex gap-4">
                  <Button asChild className="bg-accent-red hover:bg-accent-red/90">
                    <Link to={`/movies/${movie.id}`}>Saiba Mais</Link>
                  </Button>
                  
                  {movie.trailerUrl && (
                    <Button 
                      variant="outline" 
                      onClick={() => window.open(movie.trailerUrl, '_blank')}
                    >
                      Assistir Trailer
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <motion.p 
          className="text-cinema-600 dark:text-cinema-300 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Fique de olho! Nossa programação é atualizada regularmente com os próximos lançamentos.
          Você também pode se inscrever em nossa newsletter para ser o primeiro a saber sobre novos filmes.
        </motion.p>
      </div>
    </PageLayout>
  );
};

export default ComingSoon;

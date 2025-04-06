
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Movie } from '@/lib/data';

interface MovieCardProps {
  movie: Movie;
  featured?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, featured = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  if (featured) {
    return (
      <motion.div 
        className="relative rounded-xl overflow-hidden aspect-video"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img 
          src={movie.backdropUrl} 
          alt={movie.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-end">
          <div className="p-6 w-full">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-2xl md:text-3xl font-bold text-white">{movie.title}</h3>
              <Badge className="bg-accent-red text-white border-0">{movie.ageRating}</Badge>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {movie.genres.map((genre, index) => (
                <Badge key={index} variant="outline" className="text-white border-white/30">
                  {genre}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center text-white/80 gap-4 mb-4 text-sm">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{formatDate(movie.releaseDate)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{formatRuntime(movie.duration)}</span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1 text-yellow-400 fill-yellow-400" />
                <span>{movie.rating}/10</span>
              </div>
            </div>
            
            <p className="text-white/80 mb-4 line-clamp-2 md:line-clamp-3">{movie.synopsis}</p>
            
            <div className="flex space-x-3">
              <Button asChild className="bg-accent-red hover:bg-accent-red/90">
                <Link to={`/movies/${movie.id}`}>Details</Link>
              </Button>
              {movie.status === 'now-showing' && (
                <Button asChild variant="outline" className="text-white border-white/30 hover:border-white hover:bg-white/10">
                  <Link to={`/booking/${movie.id}`}>Buy Tickets</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
        
        {/* Play button overlay */}
        {movie.trailerUrl && (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button 
              size="lg" 
              className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 h-16 w-16"
              onClick={(e) => {
                e.preventDefault();
                window.open(movie.trailerUrl, '_blank');
              }}
            >
              <svg 
                className="w-6 h-6 text-white" 
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
            </Button>
          </motion.div>
        )}
      </motion.div>
    );
  }
  
  return (
    <motion.div 
      className="group relative overflow-hidden rounded-xl bg-white dark:bg-cinema-900 shadow-md transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/movies/${movie.id}`}>
        <div className="aspect-[2/3] w-full overflow-hidden">
          <img 
            src={movie.posterUrl} 
            alt={movie.title} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="absolute top-2 right-2">
          <Badge className="bg-accent-red text-white border-0">{movie.ageRating}</Badge>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1 text-cinema-900 dark:text-white">
            {movie.title}
          </h3>
          <div className="flex items-center text-cinema-500 dark:text-cinema-300 text-sm">
            <Star className="w-4 h-4 mr-1 text-yellow-500 fill-yellow-500" />
            <span>{movie.rating}/10</span>
            <span className="mx-2">•</span>
            <span>{formatRuntime(movie.duration)}</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            {movie.genres.slice(0, 2).map((genre, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {genre}
              </Badge>
            ))}
            {movie.genres.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{movie.genres.length - 2}
              </Badge>
            )}
          </div>
        </div>
        
        {/* Hover overlay */}
        <div 
          className={`absolute inset-0 bg-black/70 flex items-center justify-center flex-col p-4 opacity-0 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : ''
          }`}
        >
          <p className="text-white text-center mb-4 line-clamp-4 text-sm">
            {movie.synopsis}
          </p>
          <Button className="bg-accent-red hover:bg-accent-red/90 w-full">
            {movie.status === 'now-showing' ? 'Buy Tickets' : 'Details'}
          </Button>
        </div>
      </Link>
    </motion.div>
  );
};

export default MovieCard;

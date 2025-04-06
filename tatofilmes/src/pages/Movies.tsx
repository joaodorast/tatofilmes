
import React, { useState, useEffect } from 'react';
import { movies, Movie } from '@/lib/data';
import MovieCard from '@/components/ui/MovieCard';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Movies = () => {
  // Filter only "now-showing" movies
  const nowShowingMovies = movies.filter(movie => movie.status === 'now-showing');
  
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>(nowShowingMovies);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);
  
  // Extract all unique genres
  const allGenres = Array.from(new Set(nowShowingMovies.flatMap(movie => movie.genres))).sort();
  
  // Filter movies based on search query and selected genres
  useEffect(() => {
    let result = nowShowingMovies;
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(movie => 
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.cast.some(actor => actor.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Filter by selected genres
    if (selectedGenres.length > 0) {
      result = result.filter(movie => 
        selectedGenres.every(genre => movie.genres.includes(genre))
      );
    }
    
    setFilteredMovies(result);
  }, [searchQuery, selectedGenres, nowShowingMovies]);
  
  // Toggle genre selection
  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre) 
        : [...prev, genre]
    );
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedGenres([]);
  };
  
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="py-12 md:py-16 bg-cinema-50 dark:bg-cinema-900">
          <div className="cinema-container">
            <div className="max-w-5xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-cinema-900 dark:text-white">Now Showing</h1>
              <p className="text-cinema-600 dark:text-cinema-300 text-lg mb-8">
                Discover the latest blockbusters and independent films currently in theaters
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-3 max-w-2xl mx-auto mb-8">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cinema-400 dark:text-cinema-500 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search by title, director, or cast..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white dark:bg-cinema-800 border-cinema-200 dark:border-cinema-700"
                  />
                  {searchQuery && (
                    <button 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cinema-400 dark:text-cinema-500"
                      onClick={() => setSearchQuery('')}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                
                <Button 
                  variant={isFiltering ? "default" : "outline"} 
                  className={isFiltering ? "bg-accent-red hover:bg-accent-red/90" : ""}
                  onClick={() => setIsFiltering(!isFiltering)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                  {selectedGenres.length > 0 && (
                    <Badge className="ml-2 bg-white text-accent-red">{selectedGenres.length}</Badge>
                  )}
                </Button>
              </div>
              
              {/* Genre filters */}
              {isFiltering && (
                <motion.div 
                  className="mb-8"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white dark:bg-cinema-800 rounded-xl p-4 shadow-sm">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium text-cinema-900 dark:text-white">Filter by Genre</h3>
                      {selectedGenres.length > 0 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={clearFilters}
                          className="text-sm text-cinema-500 dark:text-cinema-400 hover:text-accent-red"
                        >
                          Clear all
                        </Button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {allGenres.map(genre => (
                        <Badge 
                          key={genre}
                          variant={selectedGenres.includes(genre) ? "default" : "outline"}
                          className={`cursor-pointer ${
                            selectedGenres.includes(genre) 
                              ? "bg-accent-red hover:bg-accent-red/90" 
                              : "hover:bg-cinema-100 dark:hover:bg-cinema-700"
                          }`}
                          onClick={() => toggleGenre(genre)}
                        >
                          {genre}
                          {selectedGenres.includes(genre) && (
                            <X className="ml-1 h-3 w-3" />
                          )}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Results count */}
              <div className="text-left mb-6 text-cinema-600 dark:text-cinema-300">
                Showing {filteredMovies.length} of {nowShowingMovies.length} movies
              </div>
              
              {/* Movie grid */}
              {filteredMovies.length > 0 ? (
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {filteredMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-xl font-semibold mb-2 text-cinema-900 dark:text-white">No movies found</h3>
                  <p className="text-cinema-600 dark:text-cinema-300 mb-4">
                    Try adjusting your search or filter criteria
                  </p>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Movies;

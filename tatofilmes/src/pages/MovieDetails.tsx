
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Star, Tag, Users, Film, Award, MessageCircle, Share2 } from 'lucide-react';
import { movies, Movie } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Tipos adicionais
interface SeatMap {
  [key: string]: boolean;
}

// Encontrar filme pelo ID
const getMovieById = (id: string): Movie | undefined => {
  return movies.find(movie => movie.id === id);
};

// Simulando horários e salas disponíveis
const availableTimes = ['14:00', '16:30', '19:00', '21:30'];
const availableTheaters = ['Sala VIP 1', 'Sala 2', 'Sala 3D 3', 'Sala IMAX 4'];
const daysFromNow = [0, 1, 2, 3, 4, 5, 6]; // Próximos 7 dias

// Preço base do ingresso
const BASE_TICKET_PRICE = 29.90;

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart, isInCart } = useCart();
  
  const [movie, setMovie] = useState<Movie | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedTheater, setSelectedTheater] = useState<string>('');
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [seatMap, setSeatMap] = useState<SeatMap>({});
  
  // Carregar dados do filme
  useEffect(() => {
    if (id) {
      // Simular uma requisição de API
      setTimeout(() => {
        const foundMovie = getMovieById(id);
        setMovie(foundMovie);
        setLoading(false);
      }, 500);
    }
  }, [id]);

  // Formatar data
  const formatDate = (daysToAdd: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    return date.toISOString().split('T')[0];
  };

  // Inicializar a data selecionada para hoje
  useEffect(() => {
    setSelectedDate(formatDate(0));
  }, []);

  // Gerar um mapa de assentos (alguns ocupados de forma aleatória)
  useEffect(() => {
    if (selectedTheater && selectedTime && selectedDate) {
      const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
      const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      
      const newSeatMap: SeatMap = {};
      
      rows.forEach(row => {
        cols.forEach(col => {
          const seatId = `${row}${col}`;
          // Aleatoriamente marcar alguns assentos como ocupados (probabilidade de 30%)
          newSeatMap[seatId] = Math.random() > 0.3;
        });
      });
      
      setSeatMap(newSeatMap);
      setSelectedSeats([]);
    }
  }, [selectedTheater, selectedTime, selectedDate]);

  // Selecionar/deselecionar um assento
  const toggleSeat = (seatId: string) => {
    if (!seatMap[seatId]) return; // Assento não disponível
    
    setSelectedSeats(prev => {
      if (prev.includes(seatId)) {
        return prev.filter(seat => seat !== seatId);
      } else {
        return [...prev, seatId];
      }
    });
  };
  
  // Adicionar ingressos ao carrinho
  const handleAddToCart = () => {
    if (!movie) return;
    
    if (!selectedDate || !selectedTime || !selectedTheater || selectedSeats.length === 0) {
      toast({
        title: 'Seleção incompleta',
        description: 'Por favor, selecione data, horário, sala e assentos.',
        variant: 'destructive',
      });
      return;
    }
    
    if (isInCart(movie.id, selectedSeats)) {
      toast({
        title: 'Ingressos já no carrinho',
        description: 'Estes ingressos já estão no seu carrinho.',
        variant: 'destructive',
      });
      return;
    }
    
    const cartItem = {
      id: uuidv4(),
      movieId: movie.id,
      movieTitle: movie.title,
      moviePoster: movie.posterUrl, // Alterado para usar posterUrl
      date: selectedDate,
      time: selectedTime,
      theater: selectedTheater,
      seats: selectedSeats,
      pricePerSeat: BASE_TICKET_PRICE
    };
    
    addToCart(cartItem);
    
    toast({
      title: 'Adicionado ao carrinho',
      description: `${selectedSeats.length} ingressos para ${movie.title}`,
      variant: 'default',
    });
    
    // Resetar seleções
    setSelectedSeats([]);
  };

  // Formatar data para exibição
  const formatDateForDisplay = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  };

  // Converter minutos em formato hora:minutos
  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse">Carregando filme...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (!movie) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <h1 className="text-2xl font-bold mb-4">Filme não encontrado</h1>
          <Button onClick={() => navigate('/')}>Voltar para a página inicial</Button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        {/* Hero banner com poster do filme */}
        <div 
          className="relative h-[50vh] bg-cover bg-center"
          style={{ 
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(${movie.backdropUrl})` 
          }}
        >
          <div className="container mx-auto px-4 h-full flex items-end pb-12">
            <div className="flex flex-col md:flex-row gap-8">
              <img 
                src={movie.posterUrl} 
                alt={movie.title} 
                className="w-40 h-60 md:w-48 md:h-72 object-cover rounded-lg shadow-lg border-4 border-white"
              />
              
              <div className="text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{movie.title}</h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="border-accent-red text-white">
                    <Star className="h-3.5 w-3.5 mr-1 text-yellow-400" />
                    {movie.rating}/10
                  </Badge>
                  <Badge variant="outline" className="border-white text-white">
                    <Film className="h-3.5 w-3.5 mr-1" />
                    {new Date(movie.releaseDate).getFullYear()}
                  </Badge>
                  <Badge variant="outline" className="border-white text-white">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    {formatRuntime(movie.duration)}
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {movie.genres.map(genre => (
                    <Badge key={genre} className="bg-accent-red text-white border-0">
                      {genre}
                    </Badge>
                  ))}
                </div>
                
                <p className="text-sm md:text-base text-gray-300 mb-6 max-w-2xl">
                  {movie.synopsis}
                </p>
                
                <div className="flex flex-wrap gap-4 mb-2">
                  <div>
                    <p className="text-sm text-gray-400">Direção</p>
                    <p>{movie.director}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Elenco</p>
                    <p>{movie.cast.slice(0, 3).join(', ')}{movie.cast.length > 3 ? '...' : ''}</p>
                  </div>
                </div>
                
                <div className="flex gap-4 mt-6">
                  <Button className="bg-accent-red hover:bg-accent-red/90">
                    Assistir Trailer
                  </Button>
                  <Button variant="outline" className="text-white border-white">
                    <Share2 className="h-4 w-4 mr-2" />
                    Compartilhar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <Tabs defaultValue="tickets" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="tickets">Ingressos</TabsTrigger>
              <TabsTrigger value="details">Detalhes</TabsTrigger>
              <TabsTrigger value="cast">Elenco</TabsTrigger>
              <TabsTrigger value="reviews">Avaliações</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tickets">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold mb-4">Comprar Ingressos</h2>
                      
                      {/* Datas */}
                      <div className="mb-6">
                        <h3 className="text-sm font-medium mb-3 flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          Selecione uma data
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {daysFromNow.map(day => {
                            const date = formatDate(day);
                            return (
                              <button
                                key={date}
                                className={`px-3 py-2 border rounded text-sm transition-colors ${
                                  selectedDate === date
                                    ? 'bg-accent-red text-white border-accent-red' 
                                    : 'border-gray-300 dark:border-gray-700 hover:border-accent-red'
                                }`}
                                onClick={() => setSelectedDate(date)}
                              >
                                {formatDateForDisplay(date)}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      
                      {/* Horários */}
                      <div className="mb-6">
                        <h3 className="text-sm font-medium mb-3 flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          Selecione um horário
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {availableTimes.map(time => (
                            <button
                              key={time}
                              className={`px-4 py-2 border rounded text-sm transition-colors ${
                                selectedTime === time
                                  ? 'bg-accent-red text-white border-accent-red' 
                                  : 'border-gray-300 dark:border-gray-700 hover:border-accent-red'
                              }`}
                              onClick={() => setSelectedTime(time)}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      {/* Salas */}
                      <div className="mb-6">
                        <h3 className="text-sm font-medium mb-3 flex items-center">
                          <Tag className="h-4 w-4 mr-2" />
                          Selecione uma sala
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {availableTheaters.map(theater => (
                            <button
                              key={theater}
                              className={`px-4 py-2 border rounded text-sm transition-colors ${
                                selectedTheater === theater
                                  ? 'bg-accent-red text-white border-accent-red' 
                                  : 'border-gray-300 dark:border-gray-700 hover:border-accent-red'
                              }`}
                              onClick={() => setSelectedTheater(theater)}
                            >
                              {theater}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      {/* Assentos */}
                      {selectedTheater && selectedTime && selectedDate && (
                        <div className="mt-8">
                          <h3 className="text-sm font-medium mb-3 flex items-center">
                            <Users className="h-4 w-4 mr-2" />
                            Selecione os assentos
                          </h3>
                          
                          <div className="w-full overflow-auto pb-4">
                            <div className="bg-gray-900 text-white text-center p-2 mb-6 w-2/3 mx-auto rounded">
                              TELA
                            </div>
                            
                            <div className="grid grid-cols-10 gap-2 w-max mx-auto">
                              {Object.entries(seatMap).map(([seatId, isAvailable]) => (
                                <button
                                  key={seatId}
                                  className={`
                                    w-8 h-8 flex items-center justify-center rounded
                                    ${!isAvailable ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed' : 
                                      selectedSeats.includes(seatId) 
                                        ? 'bg-accent-red text-white' 
                                        : 'bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800'
                                    }
                                  `}
                                  onClick={() => toggleSeat(seatId)}
                                  disabled={!isAvailable}
                                >
                                  {seatId}
                                </button>
                              ))}
                            </div>
                            
                            <div className="flex justify-center gap-8 mt-6">
                              <div className="flex items-center">
                                <div className="w-4 h-4 bg-green-100 dark:bg-green-900 rounded mr-2"></div>
                                <span className="text-sm">Disponível</span>
                              </div>
                              <div className="flex items-center">
                                <div className="w-4 h-4 bg-accent-red rounded mr-2"></div>
                                <span className="text-sm">Selecionado</span>
                              </div>
                              <div className="flex items-center">
                                <div className="w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded mr-2"></div>
                                <span className="text-sm">Ocupado</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold mb-4">Resumo</h2>
                      
                      <div className="space-y-4 mb-6">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Filme</p>
                          <p className="font-medium">{movie.title}</p>
                        </div>
                        
                        {selectedDate && (
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Data</p>
                            <p className="font-medium">{formatDateForDisplay(selectedDate)}</p>
                          </div>
                        )}
                        
                        {selectedTime && (
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Horário</p>
                            <p className="font-medium">{selectedTime}</p>
                          </div>
                        )}
                        
                        {selectedTheater && (
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Sala</p>
                            <p className="font-medium">{selectedTheater}</p>
                          </div>
                        )}
                        
                        {selectedSeats.length > 0 && (
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Assentos</p>
                            <p className="font-medium">{selectedSeats.sort().join(', ')}</p>
                          </div>
                        )}
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Preço por ingresso</span>
                          <span>R$ {BASE_TICKET_PRICE.toFixed(2).replace('.', ',')}</span>
                        </div>
                        
                        {selectedSeats.length > 0 && (
                          <div className="flex justify-between font-bold">
                            <span>Total ({selectedSeats.length} {selectedSeats.length === 1 ? 'ingresso' : 'ingressos'})</span>
                            <span>R$ {(BASE_TICKET_PRICE * selectedSeats.length).toFixed(2).replace('.', ',')}</span>
                          </div>
                        )}
                      </div>
                      
                      <Button 
                        className="w-full mt-6 bg-accent-red hover:bg-accent-red/90"
                        disabled={selectedSeats.length === 0}
                        onClick={handleAddToCart}
                      >
                        Adicionar ao carrinho
                      </Button>
                      
                      <p className="text-xs text-center mt-4 text-gray-500 dark:text-gray-400">
                        Os ingressos ficam reservados por 15 minutos após serem adicionados ao carrinho
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="details">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Sinopse</h2>
                      <p className="text-gray-700 dark:text-gray-300 mb-6">
                        {movie.synopsis}
                      </p>
                      
                      <h2 className="text-xl font-semibold mb-4">Informações</h2>
                      <ul className="space-y-2">
                        <li className="flex">
                          <span className="w-32 text-gray-500 dark:text-gray-400">Diretor</span>
                          <span>{movie.director}</span>
                        </li>
                        <li className="flex">
                          <span className="w-32 text-gray-500 dark:text-gray-400">Gênero</span>
                          <span>{movie.genres.join(', ')}</span>
                        </li>
                        <li className="flex">
                          <span className="w-32 text-gray-500 dark:text-gray-400">Duração</span>
                          <span>{formatRuntime(movie.duration)}</span>
                        </li>
                        <li className="flex">
                          <span className="w-32 text-gray-500 dark:text-gray-400">Ano</span>
                          <span>{new Date(movie.releaseDate).getFullYear()}</span>
                        </li>
                        <li className="flex">
                          <span className="w-32 text-gray-500 dark:text-gray-400">Classificação</span>
                          <span>{movie.ageRating}</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Trailer</h2>
                      <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded flex items-center justify-center">
                        {movie.trailerUrl ? (
                          <iframe
                            width="100%"
                            height="100%"
                            src={movie.trailerUrl}
                            title={`Trailer de ${movie.title}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="rounded"
                          ></iframe>
                        ) : (
                          <div className="text-center text-gray-500">Trailer não disponível</div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="cast">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Elenco e Equipe</h2>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {movie.cast.map((actor, index) => (
                      <div key={index} className="text-center">
                        <div className="w-full aspect-square bg-gray-200 dark:bg-gray-800 rounded-full mb-3 overflow-hidden">
                          <img 
                            src={`https://source.unsplash.com/100x100/?portrait,person&random=${index}`} 
                            alt={actor}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="font-medium">{actor}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Ator/Atriz</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Avaliações & Críticas</h2>
                    {isAuthenticated ? (
                      <Button>
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Escrever avaliação
                      </Button>
                    ) : (
                      <Button variant="outline" onClick={() => navigate('/login')}>
                        Fazer login para avaliar
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-6">
                    {/* Simulando algumas avaliações */}
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="border-b pb-6 last:border-0">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden flex-shrink-0">
                            <img 
                              src={`https://source.unsplash.com/100x100/?face&random=${index}`} 
                              alt="User"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center mb-1">
                              <h3 className="font-semibold mr-2">Usuário {index + 1}</h3>
                              <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star key={i} className={`h-4 w-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                              Publicado em {new Date().toLocaleDateString('pt-BR')}
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                              {index === 0 ? (
                                "Um filme incrível com uma narrativa envolvente! A cinematografia é deslumbrante e a atuação do elenco principal merece reconhecimento. Recomendo fortemente para todos os fãs do gênero."
                              ) : index === 1 ? (
                                "Gostei muito do filme, mas achei que o ritmo cai um pouco no terceiro ato. Ainda assim, vale a pena pela experiência visual e pelas cenas de ação bem coreografadas."
                              ) : (
                                "Esperava mais deste filme considerando o elenco envolvido. A história tem potencial, mas a execução deixou a desejar em alguns momentos cruciais."
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MovieDetails;

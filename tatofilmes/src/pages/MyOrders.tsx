
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Download, Film, Loader2, MapPin, Ticket } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Tipos para pedidos
interface Order {
  id: string;
  movieId: string;
  movieTitle: string;
  moviePoster: string;
  date: string;
  time: string;
  theater: string;
  seats: string[];
  totalAmount: number;
  status: 'completed' | 'upcoming' | 'canceled';
  qrCode?: string;
}

const MyOrders = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);

  // Redirecionamento se não estiver autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Simular carregamento de pedidos
    const timeout = setTimeout(() => {
      // Dados fictícios para demonstração
      const mockOrders: Order[] = [
        {
          id: 'ORD-001',
          movieId: '1',
          movieTitle: 'Inception',
          moviePoster: 'https://source.unsplash.com/300x450/?movie,inception',
          date: '2023-10-15',
          time: '19:30',
          theater: 'Sala Premium 3',
          seats: ['G7', 'G8'],
          totalAmount: 46.00,
          status: 'completed',
          qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ORD-001'
        },
        {
          id: 'ORD-002',
          movieId: '3',
          movieTitle: 'The Dark Knight',
          moviePoster: 'https://source.unsplash.com/300x450/?movie,batman',
          date: '2023-10-22',
          time: '20:15',
          theater: 'IMAX Experience',
          seats: ['D5', 'D6', 'D7'],
          totalAmount: 75.50,
          status: 'upcoming',
          qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ORD-002'
        },
        {
          id: 'ORD-003',
          movieId: '5',
          movieTitle: 'The Matrix',
          moviePoster: 'https://source.unsplash.com/300x450/?movie,matrix',
          date: '2023-09-05',
          time: '18:00',
          theater: 'Sala 2',
          seats: ['H12'],
          totalAmount: 22.00,
          status: 'canceled'
        }
      ];
      
      setOrders(mockOrders);
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timeout);
  }, [isAuthenticated, navigate]);

  const formatDate = (dateStr: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateStr).toLocaleDateString('pt-BR', options);
  };

  const getStatusLabel = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            Realizado
          </Badge>
        );
      case 'upcoming':
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            Próximo
          </Badge>
        );
      case 'canceled':
        return (
          <Badge variant="outline" className="border-red-500 text-red-500">
            Cancelado
          </Badge>
        );
      default:
        return null;
    }
  };

  const upcomingOrders = orders.filter(order => order.status === 'upcoming');
  const pastOrders = orders.filter(order => ['completed', 'canceled'].includes(order.status));

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-accent-red" />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-16 px-4 md:px-6 bg-gray-50 dark:bg-cinema-950">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-cinema-900 dark:text-white">
                  Meus Pedidos
                </h1>
                <p className="text-cinema-600 dark:text-cinema-300 mt-1">
                  Visualize e gerencie seus ingressos
                </p>
              </div>
            </div>

            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="grid grid-cols-2 mb-8">
                <TabsTrigger value="upcoming">Próximos ({upcomingOrders.length})</TabsTrigger>
                <TabsTrigger value="past">Histórico ({pastOrders.length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming">
                {upcomingOrders.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Ticket className="h-12 w-12 text-cinema-400 mb-4" />
                      <h3 className="text-xl font-medium text-cinema-900 dark:text-white mb-2">
                        Nenhum ingresso próximo
                      </h3>
                      <p className="text-cinema-600 dark:text-cinema-300 text-center max-w-md mb-6">
                        Você não tem ingressos para sessões futuras. Que tal assistir a um filme?
                      </p>
                      <Button 
                        onClick={() => navigate('/movies')} 
                        className="bg-accent-red hover:bg-accent-red/90"
                      >
                        Explorar filmes
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    {upcomingOrders.map((order) => (
                      <OrderCard key={order.id} order={order} />
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="past">
                {pastOrders.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Film className="h-12 w-12 text-cinema-400 mb-4" />
                      <h3 className="text-xl font-medium text-cinema-900 dark:text-white mb-2">
                        Sem histórico de pedidos
                      </h3>
                      <p className="text-cinema-600 dark:text-cinema-300 text-center max-w-md">
                        Você ainda não realizou pedidos de ingressos.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    {pastOrders.map((order) => (
                      <OrderCard key={order.id} order={order} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
};

const OrderCard = ({ order }: { order: Order }) => {
  const navigate = useNavigate();
  
  const formatDate = (dateStr: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateStr).toLocaleDateString('pt-BR', options);
  };

  const getStatusLabel = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            Realizado
          </Badge>
        );
      case 'upcoming':
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            Próximo
          </Badge>
        );
      case 'canceled':
        return (
          <Badge variant="outline" className="border-red-500 text-red-500">
            Cancelado
          </Badge>
        );
      default:
        return null;
    }
  };
  
  return (
    <Card>
      <CardContent className="p-0">
        <div className="md:flex">
          {/* Imagem do filme */}
          <div className="md:w-1/4 h-48 md:h-auto overflow-hidden">
            <img 
              src={order.moviePoster} 
              alt={order.movieTitle} 
              className="w-full h-full object-cover"
              onClick={() => navigate(`/movies/${order.movieId}`)}
              style={{ cursor: 'pointer' }}
            />
          </div>
          
          {/* Detalhes do pedido */}
          <div className="p-4 md:p-6 md:w-3/4">
            <div className="flex flex-wrap justify-between items-start mb-4">
              <div>
                <h3 
                  className="text-xl font-bold text-cinema-900 dark:text-white mb-1 cursor-pointer"
                  onClick={() => navigate(`/movies/${order.movieId}`)}
                >
                  {order.movieTitle}
                </h3>
                <div className="text-sm text-cinema-600 dark:text-cinema-300">
                  Pedido #{order.id}
                </div>
              </div>
              {getStatusLabel(order.status)}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-cinema-500 dark:text-cinema-400" />
                <span>{formatDate(order.date)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-cinema-500 dark:text-cinema-400" />
                <span>{order.time}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-cinema-500 dark:text-cinema-400" />
                <span>{order.theater}</span>
              </div>
              <div className="flex items-center">
                <Ticket className="h-4 w-4 mr-2 text-cinema-500 dark:text-cinema-400" />
                <span>Assentos: {order.seats.join(', ')}</span>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between border-t pt-4">
              <div className="mb-3 md:mb-0">
                <span className="font-medium">Total:</span>{' '}
                <span className="font-bold text-lg">
                  R$ {order.totalAmount.toFixed(2).replace('.', ',')}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {order.status === 'upcoming' && (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(order.qrCode)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Baixar e-ticket
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                    >
                      Cancelar
                    </Button>
                  </>
                )}
                
                {order.status === 'completed' && (
                  <Button 
                    className="bg-accent-red hover:bg-accent-red/90" 
                    size="sm"
                    onClick={() => navigate(`/movies/${order.movieId}`)}
                  >
                    Avaliar filme
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MyOrders;

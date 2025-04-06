
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Calendar, Clock, MapPin, Ticket, ShoppingCart, ArrowRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Cart = () => {
  const { items, removeFromCart, clearCart, getTotalItems, getTotalPrice } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=checkout');
    } else {
      navigate('/checkout');
    }
  };

  const formatDate = (dateStr: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateStr).toLocaleDateString('pt-BR', options);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-16 px-4 md:px-6 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-cinema-950 dark:to-cinema-900">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-cinema-900 dark:text-white">
                  Carrinho
                </h1>
                <p className="text-cinema-600 dark:text-cinema-300 mt-1">
                  {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'itens'} no carrinho
                </p>
              </div>
              
              {items.length > 0 && (
                <Button 
                  variant="outline" 
                  className="mt-4 md:mt-0 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                  onClick={clearCart}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Limpar carrinho
                </Button>
              )}
            </div>

            {items.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <ShoppingCart className="h-12 w-12 text-cinema-400 mb-4" />
                  <h3 className="text-xl font-medium text-cinema-900 dark:text-white mb-2">
                    Seu carrinho está vazio
                  </h3>
                  <p className="text-cinema-600 dark:text-cinema-300 text-center max-w-md mb-6">
                    Parece que você ainda não adicionou nenhum ingresso ao seu carrinho.
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <div className="space-y-4">
                    {items.map((item) => (
                      <Card key={item.id} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                        <CardContent className="p-0">
                          <div className="flex flex-col sm:flex-row">
                            {/* Imagem do filme */}
                            <div className="sm:w-1/3 md:w-1/4 h-48 sm:h-auto">
                              <img 
                                src={item.moviePoster} 
                                alt={item.movieTitle} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            {/* Detalhes do ingresso */}
                            <div className="p-4 flex-1">
                              <h3 className="text-xl font-bold text-cinema-900 dark:text-white mb-3">
                                {item.movieTitle}
                              </h3>
                              
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-2 text-cinema-500 dark:text-cinema-400" />
                                  <span>{formatDate(item.date)}</span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-2 text-cinema-500 dark:text-cinema-400" />
                                  <span>{item.time}</span>
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-2 text-cinema-500 dark:text-cinema-400" />
                                  <span>{item.theater}</span>
                                </div>
                                <div className="flex items-center">
                                  <Ticket className="h-4 w-4 mr-2 text-cinema-500 dark:text-cinema-400" />
                                  <span>
                                    {item.seats.length} {item.seats.length === 1 ? 'assento' : 'assentos'}: {item.seats.join(', ')}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="flex justify-between items-center">
                                <div>
                                  <div className="text-sm text-cinema-600 dark:text-cinema-300">
                                    R$ {item.pricePerSeat.toFixed(2).replace('.', ',')} por assento
                                  </div>
                                  <div className="font-bold text-accent-red">
                                    Total: R$ {(item.pricePerSeat * item.seats.length).toFixed(2).replace('.', ',')}
                                  </div>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Remover
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Card className="border-0 shadow-md sticky top-24">
                    <CardHeader className="bg-gradient-to-r from-accent-red to-accent-lightred text-white rounded-t-lg">
                      <CardTitle>Resumo do pedido</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span>Ingressos ({getTotalItems()})</span>
                          <span>R$ {getTotalPrice().toFixed(2).replace('.', ',')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Taxa de serviço</span>
                          <span>R$ {(getTotalPrice() * 0.10).toFixed(2).replace('.', ',')}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total</span>
                          <span className="text-accent-red">R$ {(getTotalPrice() * 1.10).toFixed(2).replace('.', ',')}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full bg-gradient-to-r from-accent-red to-accent-lightred hover:from-accent-darkred hover:to-accent-red text-white"
                        onClick={handleCheckout}
                      >
                        {isAuthenticated ? 'Finalizar compra' : 'Fazer login para finalizar'}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Cart;

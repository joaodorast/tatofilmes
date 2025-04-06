
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { movies } from '@/lib/data';

export interface CartItem {
  id: string;
  movieId: string;
  movieTitle: string;
  moviePoster: string;
  date: string;
  time: string;
  theater: string;
  seats: string[];
  pricePerSeat: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  isInCart: (movieId: string, seats: string[]) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Carregar carrinho do localStorage quando o componente é montado
  useEffect(() => {
    const savedCart = localStorage.getItem('cinema_cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Erro ao analisar o carrinho armazenado:', error);
      }
    }
  }, []);

  // Atualizar localStorage quando o carrinho muda
  useEffect(() => {
    localStorage.setItem('cinema_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (item: CartItem) => {
    // Verificar se já existe um item com o mesmo ID (mesmo filme e mesmos assentos)
    const existingItem = items.find(i => i.id === item.id);
    
    if (existingItem) {
      toast({
        title: 'Item já adicionado',
        description: 'Estes ingressos já estão no seu carrinho',
        variant: 'destructive',
      });
      return;
    }
    
    // Verificar se há conflito de assentos (mesma sala, data e horário)
    const conflictingItem = items.find(i => 
      i.theater === item.theater && 
      i.date === item.date && 
      i.time === item.time && 
      i.seats.some(seat => item.seats.includes(seat))
    );
    
    if (conflictingItem) {
      toast({
        title: 'Conflito de assentos',
        description: 'Você já tem ingressos para alguns destes assentos no mesmo horário',
        variant: 'destructive',
      });
      return;
    }
    
    setItems(prevItems => [...prevItems, item]);
    
    toast({
      title: 'Adicionado ao carrinho',
      description: `${item.seats.length} ingresso(s) para ${item.movieTitle}`,
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
    
    toast({
      title: 'Item removido',
      description: 'Item removido do carrinho com sucesso',
    });
  };

  const clearCart = () => {
    setItems([]);
    
    toast({
      title: 'Carrinho limpo',
      description: 'Todos os itens foram removidos do carrinho',
    });
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.seats.length, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.pricePerSeat * item.seats.length), 0);
  };

  const isInCart = (movieId: string, seats: string[]) => {
    return items.some(item => 
      item.movieId === movieId && 
      seats.every(seat => item.seats.includes(seat))
    );
  };

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      getTotalItems, 
      getTotalPrice,
      isInCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
}

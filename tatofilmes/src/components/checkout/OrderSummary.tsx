
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CartItem } from '@/context/CartContext';

interface OrderSummaryProps {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  paymentMethod: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ 
  items, 
  totalItems, 
  totalPrice, 
  paymentMethod 
}) => {
  return (
    <Card className="border-0 shadow-md sticky top-24">
      <CardHeader className="bg-gradient-to-r from-accent-red to-accent-lightred text-white rounded-t-lg">
        <CardTitle>Resumo do pedido</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <p className="font-medium mb-2">Ingressos: ({totalItems})</p>
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm py-1">
                <span className="text-cinema-600 dark:text-cinema-300">
                  {item.movieTitle} ({item.seats.length} {item.seats.length === 1 ? 'ingresso' : 'ingressos'})
                </span>
                <span>
                  R$ {(item.pricePerSeat * item.seats.length).toFixed(2).replace('.', ',')}
                </span>
              </div>
            ))}
          </div>
          
          <Separator />
          
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
          </div>
          
          <div className="flex justify-between">
            <span>Taxa de serviço</span>
            <span>R$ {(totalPrice * 0.10).toFixed(2).replace('.', ',')}</span>
          </div>
          
          {paymentMethod === 'pix' && (
            <div className="flex justify-between text-green-600 dark:text-green-400">
              <span>Desconto Pix (5%)</span>
              <span>- R$ {(totalPrice * 1.10 * 0.05).toFixed(2).replace('.', ',')}</span>
            </div>
          )}
          
          <Separator />
          
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span className="text-accent-red">
              R$ {paymentMethod === 'pix' 
                ? (totalPrice * 1.10 * 0.95).toFixed(2).replace('.', ',')
                : (totalPrice * 1.10).toFixed(2).replace('.', ',')}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;

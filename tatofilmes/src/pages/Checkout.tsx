
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Loader2, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { toast } from '@/hooks/use-toast';
import { sendEmail } from '@/utils/emailService';
import PaymentMethods from '@/components/checkout/PaymentMethods';
import OrderSummary from '@/components/checkout/OrderSummary';
import SuccessOrder from '@/components/checkout/SuccessOrder';
import { validateCardNumber, validateCVV, validateExpiryDate } from '@/components/checkout/CardValidation';

const Checkout = () => {
  const { items, getTotalItems, getTotalPrice, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const [cardForm, setCardForm] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    installments: '1'
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Redirecionar para login se não estiver autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?redirect=checkout');
      return;
    }
    
    // Redirecionar para o carrinho se estiver vazio
    if (items.length === 0 && !orderPlaced) {
      navigate('/cart');
    }
  }, [isAuthenticated, items.length, navigate, orderPlaced]);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (paymentMethod === 'credit') {
      // Validate card details
      if (!cardForm.cardNumber.trim()) {
        errors.cardNumber = 'O número do cartão é obrigatório';
      } else if (!validateCardNumber(cardForm.cardNumber)) {
        errors.cardNumber = 'Número de cartão inválido';
      }
      
      if (!cardForm.cardName.trim()) {
        errors.cardName = 'O nome no cartão é obrigatório';
      }
      
      if (!cardForm.expiryDate.trim()) {
        errors.expiryDate = 'A data de validade é obrigatória';
      } else if (!validateExpiryDate(cardForm.expiryDate)) {
        errors.expiryDate = 'Data de validade inválida ou expirada';
      }
      
      if (!cardForm.cvv.trim()) {
        errors.cvv = 'O código de segurança é obrigatório';
      } else if (!validateCVV(cardForm.cvv)) {
        errors.cvv = 'Código de segurança inválido';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verificar autenticação novamente
    if (!isAuthenticated) {
      navigate('/login?redirect=checkout');
      return;
    }
    
    // Validar formulário
    if (!validateForm()) {
      toast({
        title: 'Erro no formulário',
        description: 'Por favor, corrija os erros no formulário antes de continuar.',
        variant: 'destructive',
      });
      return;
    }
    
    setLoading(true);
    
    // Gerar número do pedido
    const generatedOrderNumber = `ORD-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;
    setOrderNumber(generatedOrderNumber);
    
    // Simular processamento de pagamento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      // Enviar email de confirmação de compra
      if (user && user.email) {
        await sendEmail({
          to: user.email,
          subject: `Confirmação de Compra - Pedido #${generatedOrderNumber}`,
          template: 'purchase-confirmation',
          data: {
            orderNumber: generatedOrderNumber,
            movieTitle: items[0]?.movieTitle || 'Filme',
            date: new Date().toLocaleDateString('pt-BR'),
            seats: items.flatMap(item => item.seats)
          }
        });
      }
      
      setOrderPlaced(true);
      clearCart();
      
      toast({
        title: 'Pedido realizado com sucesso!',
        description: 'Seus ingressos foram enviados para seu e-mail.',
      });
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      toast({
        title: 'Erro no processamento do pagamento',
        description: 'Ocorreu um erro ao processar seu pagamento. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return <SuccessOrder orderNumber={orderNumber} user={user} />;
  }

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
            <div className="flex items-center mb-8">
              <Button 
                variant="ghost" 
                size="sm" 
                className="mr-2"
                onClick={() => navigate('/cart')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar ao carrinho
              </Button>
              <h1 className="text-2xl md:text-3xl font-bold text-cinema-900 dark:text-white">
                Finalizar compra
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Card className="border-0 shadow-md">
                  <CardHeader className="border-b">
                    <CardTitle>Método de pagamento</CardTitle>
                    <CardDescription>
                      Escolha como deseja pagar pelos ingressos
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <form onSubmit={handleSubmit}>
                      <PaymentMethods
                        paymentMethod={paymentMethod}
                        setPaymentMethod={setPaymentMethod}
                        cardForm={cardForm}
                        setCardForm={setCardForm}
                        formErrors={formErrors}
                        totalPrice={getTotalPrice()}
                      />
                      
                      <Separator className="my-6" />
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-accent-red to-accent-lightred hover:from-accent-darkred hover:to-accent-red"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processando pagamento...
                          </>
                        ) : (
                          'Concluir compra'
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <OrderSummary 
                  items={items}
                  totalItems={getTotalItems()}
                  totalPrice={getTotalPrice()}
                  paymentMethod={paymentMethod}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Checkout;

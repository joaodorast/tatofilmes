
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { User } from '@/types/auth';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface SuccessOrderProps {
  orderNumber: string;
  user: User | null;
}

const SuccessOrder: React.FC<SuccessOrderProps> = ({ orderNumber, user }) => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-16 px-4 md:px-6 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-cinema-950 dark:to-cinema-900">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-green-600 dark:text-green-300" />
            </div>
            <h1 className="text-3xl font-bold text-cinema-900 dark:text-white mb-3">
              Compra concluída!
            </h1>
            <p className="text-cinema-600 dark:text-cinema-300 mb-4 max-w-md mx-auto">
              Seu pedido <strong>#{orderNumber}</strong> foi processado com sucesso. Enviamos os ingressos para {user?.email}.
            </p>
            <div className="bg-cinema-50 dark:bg-cinema-800/30 p-4 rounded-lg mb-8 max-w-md mx-auto">
              <p className="text-sm text-cinema-600 dark:text-cinema-300">
                <strong>Importante:</strong> Verifique sua caixa de entrada e pasta de spam caso não encontre o email com seus ingressos.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/my-orders')}
                className="bg-gradient-to-r from-accent-red to-accent-lightred hover:from-accent-darkred hover:to-accent-red"
              >
                Ver meus pedidos
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/movies')}
              >
                Continuar comprando
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SuccessOrder;

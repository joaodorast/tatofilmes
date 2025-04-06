
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, CheckCircle, Loader2 } from 'lucide-react';
import { subscribeToNewsletter } from '@/utils/emailService';
import { toast } from '@/hooks/use-toast';

interface NewsletterProps {
  className?: string;
  compact?: boolean;
}

const Newsletter = ({ className = '', compact = false }: NewsletterProps) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: 'Erro',
        description: 'Por favor, informe seu email.',
        variant: 'destructive',
      });
      return;
    }
    
    setLoading(true);
    
    try {
      await subscribeToNewsletter(email, name);
      setSuccess(true);
      toast({
        title: 'Inscrição confirmada!',
        description: 'Você receberá nossas novidades em breve.',
      });
      setEmail('');
      setName('');
      
      // Reset success state after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível completar sua inscrição. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (compact) {
    return (
      <div className={`${className}`}>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <div className="flex-grow">
            <Input
              type="email"
              placeholder="Seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading || success}
              className="w-full"
            />
          </div>
          <Button 
            type="submit" 
            disabled={loading || success}
            className="bg-accent-red hover:bg-accent-darkred"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : success ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              'Inscrever'
            )}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className={`bg-cinema-50 dark:bg-cinema-800/30 rounded-lg p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-accent-red/10 flex items-center justify-center">
          <Mail className="h-5 w-5 text-accent-red" />
        </div>
        <h3 className="text-lg font-semibold text-cinema-900 dark:text-white">
          Receba Novidades
        </h3>
      </div>
      
      {success ? (
        <div className="flex flex-col items-center text-center py-4">
          <CheckCircle className="h-12 w-12 text-green-500 mb-2" />
          <p className="text-cinema-600 dark:text-cinema-300">
            Inscrição confirmada! Você receberá nossas novidades em breve.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <p className="text-cinema-600 dark:text-cinema-300 text-sm">
            Inscreva-se para receber lançamentos, promoções exclusivas e mais!
          </p>
          
          <div>
            <Input
              type="text"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              className="mb-2"
            />
            <Input
              type="email"
              placeholder="Seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-accent-red hover:bg-accent-darkred"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processando...
              </>
            ) : (
              'Inscrever-se'
            )}
          </Button>
        </form>
      )}
    </div>
  );
};

export default Newsletter;

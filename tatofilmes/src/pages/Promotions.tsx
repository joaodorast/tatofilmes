
import React from 'react';
import { motion } from 'framer-motion';
import { CalendarIcon, Ticket, Users, Coffee, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/layout/PageLayout';
import { Link } from 'react-router-dom';

const Promotions = () => {
  const promotions = [
    {
      title: "Terça Imperdível",
      description: "Todos os ingressos pela metade do preço às terças-feiras!",
      icon: <CalendarIcon className="h-10 w-10 text-accent-red" />,
      conditions: "Válido para todas as sessões às terças-feiras, exceto feriados e pré-estreias.",
      ctaText: "Comprar Ingressos"
    },
    {
      title: "Combo Família",
      description: "4 ingressos + 2 pipocas grandes + 4 refrigerantes com 30% de desconto!",
      icon: <Users className="h-10 w-10 text-accent-red" />,
      conditions: "Válido todos os dias para famílias com pelo menos 1 criança até 12 anos.",
      ctaText: "Aproveitar Oferta"
    },
    {
      title: "Happy Hour Cinema",
      description: "De segunda a quinta, sessões entre 17h e 19h com 25% de desconto + 1 bebida grátis!",
      icon: <Coffee className="h-10 w-10 text-accent-red" />,
      conditions: "Válido apenas para sessões específicas indicadas na programação.",
      ctaText: "Ver Sessões"
    },
    {
      title: "Aniversariante Não Paga",
      description: "No dia do seu aniversário, seu ingresso é por nossa conta!",
      icon: <Ticket className="h-10 w-10 text-accent-red" />,
      conditions: "Necessário apresentar documento com foto. Válido apenas no dia do aniversário.",
      ctaText: "Saiba Mais"
    },
    {
      title: "Clube de Vantagens",
      description: "Acumule pontos a cada compra e troque por ingressos, combos e produtos exclusivos!",
      icon: <CreditCard className="h-10 w-10 text-accent-red" />,
      conditions: "Disponível para membros cadastrados no programa de fidelidade.",
      ctaText: "Cadastrar-se"
    }
  ];

  return (
    <PageLayout 
      title="Promoções Exclusivas" 
      subtitle="Aproveite nossas ofertas especiais e economize em sua experiência cinematográfica"
      bgImageUrl="https://source.unsplash.com/random/1920x1080/?cinema,popcorn"
    >
      <div className="text-center mb-12">
        <h2 className="heading-sm text-cinema-900 dark:text-white mb-4">
          Ofertas Imperdíveis Para Todos os Momentos
        </h2>
        <p className="text-cinema-600 dark:text-cinema-400 max-w-2xl mx-auto">
          No TatoFilmes, acreditamos que todos merecem desfrutar da magia do cinema. 
          Por isso, criamos promoções especiais para diferentes ocasiões. Confira abaixo!
        </p>
      </div>

      <div className="space-y-6">
        {promotions.map((promo, index) => (
          <motion.div 
            key={index}
            className="bg-white dark:bg-cinema-900 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0 flex items-start justify-center">
                <div className="p-4 bg-accent-red/10 rounded-full">
                  {promo.icon}
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-cinema-900 dark:text-white mb-3">
                  {promo.title}
                </h3>
                <p className="text-lg text-cinema-700 dark:text-cinema-200 mb-4">
                  {promo.description}
                </p>
                <p className="text-sm text-cinema-500 dark:text-cinema-400 mb-6 italic">
                  * {promo.conditions}
                </p>
                
                <Button asChild className="bg-gradient-to-r from-accent-red to-accent-lightred hover:from-accent-darkred hover:to-accent-red">
                  <Link to="/movies">
                    {promo.ctaText}
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="bg-accent-red text-white rounded-xl p-8 mt-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4">Promoções Especiais por Email</h3>
            <p className="mb-6">
              Cadastre-se em nossa newsletter e receba ofertas exclusivas, combos especiais e 
              pré-venda de ingressos para os lançamentos mais aguardados diretamente em seu email.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Seu melhor email" 
                className="px-4 py-2 rounded-md border border-white/30 bg-white/10 text-white placeholder-white/70 flex-1 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Button className="bg-white text-accent-red hover:bg-white/90 whitespace-nowrap">
                Quero Receber
              </Button>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full border-4 border-dashed border-white/30 animate-spin-slow"></div>
              <div className="text-6xl">🎟️</div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Promotions;

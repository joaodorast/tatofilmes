
import React from 'react';
import { motion } from 'framer-motion';
import { Gift, CreditCard, Mail, Clock, Zap, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PageLayout from '@/components/layout/PageLayout';

const GiftCards = () => {
  const giftCardOptions = [
    {
      value: "Cinema Clássico",
      price: "R$ 50,00",
      benefits: [
        "Válido para 1 ingresso em qualquer dia e horário",
        "Válido por 6 meses"
      ],
      color: "bg-gradient-to-r from-sky-500 to-indigo-500"
    },
    {
      value: "Cinema Premium",
      price: "R$ 100,00",
      benefits: [
        "Válido para 2 ingressos em qualquer dia e horário",
        "Válido por 6 meses",
        "Inclui 1 combo pequeno de pipoca e refrigerante"
      ],
      color: "bg-gradient-to-r from-accent-red to-accent-gold",
      featured: true
    },
    {
      value: "Cinema Deluxe",
      price: "R$ 200,00",
      benefits: [
        "Válido para 2 ingressos VIP (poltronas reclináveis)",
        "Válido por 12 meses",
        "Inclui 1 combo grande de pipoca e 2 refrigerantes",
        "Acesso à sala VIP (lounge) antes da sessão"
      ],
      color: "bg-gradient-to-r from-purple-600 to-pink-500"
    }
  ];

  const steps = [
    {
      title: "Escolha o Vale-Presente",
      description: "Selecione entre nossas opções de valores e modelos",
      icon: <Gift className="h-8 w-8" />
    },
    {
      title: "Personalize sua Mensagem",
      description: "Adicione uma mensagem especial para o destinatário",
      icon: <Mail className="h-8 w-8" />
    },
    {
      title: "Faça o Pagamento",
      description: "Escolha entre cartão de crédito, débito ou PIX",
      icon: <CreditCard className="h-8 w-8" />
    },
    {
      title: "Entrega Instantânea",
      description: "O vale-presente será enviado imediatamente por e-mail",
      icon: <Zap className="h-8 w-8" />
    }
  ];

  return (
    <PageLayout 
      title="Vale-Presentes" 
      subtitle="O presente perfeito para os amantes de cinema"
      bgImageUrl="https://source.unsplash.com/random/1920x1080/?gift,present,cinema"
    >
      <div className="text-center mb-16">
        <motion.h2 
          className="heading-sm text-cinema-900 dark:text-white mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Dê o Presente da Experiência Cinematográfica
        </motion.h2>
        
        <motion.p 
          className="text-cinema-600 dark:text-cinema-300 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Um Vale-Presente do TatoFilmes é mais do que um simples cartão: é uma experiência inesquecível, 
          uma porta de entrada para mundos fantásticos e histórias emocionantes. Perfeito para aniversários, 
          datas comemorativas ou para simplesmente dizer "Obrigado".
        </motion.p>
      </div>

      <motion.div 
        className="grid md:grid-cols-3 gap-6 mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {giftCardOptions.map((card, index) => (
          <div 
            key={index} 
            className={`rounded-xl overflow-hidden shadow-lg ${card.featured ? 'ring-4 ring-accent-gold' : ''} relative`}
          >
            {card.featured && (
              <div className="absolute top-4 right-4 bg-accent-gold text-white text-xs font-bold px-2 py-1 rounded-full">
                MAIS POPULAR
              </div>
            )}
            
            <div className={`${card.color} p-6 h-48 flex items-center justify-center`}>
              <div className="bg-white/20 backdrop-blur-sm p-8 rounded-full">
                <Gift className="h-16 w-16 text-white" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-cinema-900 p-6">
              <h3 className="text-xl font-bold text-cinema-900 dark:text-white mb-2">{card.value}</h3>
              <p className="text-2xl font-bold text-accent-red mb-4">{card.price}</p>
              
              <ul className="space-y-2 mb-6">
                {card.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-accent-red flex-shrink-0 mr-2 mt-0.5" />
                    <span className="text-cinema-600 dark:text-cinema-300 text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <Button className="w-full bg-gradient-to-r from-accent-red to-accent-lightred hover:from-accent-darkred hover:to-accent-red">
                Comprar Agora
              </Button>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div 
        className="mb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="heading-sm text-cinema-900 dark:text-white text-center mb-10">
          Como Funciona
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white dark:bg-cinema-900 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-800 text-center h-full">
                <div className="w-16 h-16 bg-accent-red/10 rounded-full flex items-center justify-center mx-auto mb-4 text-accent-red">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-cinema-900 dark:text-white">{step.title}</h3>
                <p className="text-cinema-600 dark:text-cinema-400">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                  <svg className="w-6 h-6 text-accent-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div 
        className="bg-white dark:bg-cinema-900 rounded-xl shadow-lg overflow-hidden mb-16 border border-gray-100 dark:border-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="p-8">
          <h2 className="heading-sm text-cinema-900 dark:text-white text-center mb-8">
            Compre seu Vale-Presente
          </h2>
          
          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="email" className="data-[state=active]:bg-accent-red data-[state=active]:text-white">
                Envio por Email
              </TabsTrigger>
              <TabsTrigger value="print" className="data-[state=active]:bg-accent-red data-[state=active]:text-white">
                Imprimir em Casa
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="email" className="mt-0 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="sender-name">Seu Nome</Label>
                    <Input id="sender-name" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="sender-email">Seu Email</Label>
                    <Input id="sender-email" type="email" className="mt-1" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="recipient-name">Nome do Destinatário</Label>
                    <Input id="recipient-name" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="recipient-email">Email do Destinatário</Label>
                    <Input id="recipient-email" type="email" className="mt-1" />
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="message">Mensagem Personalizada (opcional)</Label>
                <textarea 
                  id="message" 
                  className="w-full mt-1 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-red"
                  rows={4}
                  placeholder="Escreva uma mensagem especial para o destinatário..."
                ></textarea>
              </div>
              
              <div>
                <Label htmlFor="gift-card-type">Selecione o Tipo de Vale-Presente</Label>
                <select 
                  id="gift-card-type"
                  className="w-full mt-1 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-red"
                >
                  <option value="">Selecione uma opção</option>
                  {giftCardOptions.map((card, index) => (
                    <option key={index} value={card.value}>{card.value} - {card.price}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <Label htmlFor="delivery-date" className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Data de Entrega
                </Label>
                <Input id="delivery-date" type="date" className="mt-1" />
                <p className="text-sm text-cinema-500 dark:text-cinema-400 mt-1">
                  Deixe em branco para envio imediato
                </p>
              </div>
              
              <Button className="w-full bg-gradient-to-r from-accent-red to-accent-lightred hover:from-accent-darkred hover:to-accent-red">
                Prosseguir para Pagamento
              </Button>
            </TabsContent>
            
            <TabsContent value="print" className="mt-0 space-y-6">
              <p className="text-cinema-600 dark:text-cinema-300">
                Escolha esta opção para receber seu Vale-Presente em formato PDF para imprimir em casa.
                Perfeito para presentear pessoalmente.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name-print">Seu Nome</Label>
                    <Input id="name-print" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="email-print">Seu Email</Label>
                    <Input id="email-print" type="email" className="mt-1" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="recipient-name-print">Nome do Presenteado</Label>
                    <Input id="recipient-name-print" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="gift-card-type-print">Selecione o Tipo de Vale-Presente</Label>
                    <select 
                      id="gift-card-type-print"
                      className="w-full mt-1 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-red"
                    >
                      <option value="">Selecione uma opção</option>
                      {giftCardOptions.map((card, index) => (
                        <option key={index} value={card.value}>{card.value} - {card.price}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="message-print">Mensagem Personalizada (opcional)</Label>
                <textarea 
                  id="message-print" 
                  className="w-full mt-1 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-red"
                  rows={4}
                  placeholder="Escreva uma mensagem especial para o destinatário..."
                ></textarea>
              </div>
              
              <Button className="w-full bg-gradient-to-r from-accent-red to-accent-lightred hover:from-accent-darkred hover:to-accent-red">
                Prosseguir para Pagamento
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>

      <motion.div 
        className="bg-cinema-50 dark:bg-cinema-800/30 rounded-xl p-6 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <h3 className="text-lg font-semibold text-cinema-900 dark:text-white mb-4">
          Termos e Condições dos Vale-Presentes
        </h3>
        
        <ul className="list-disc pl-5 space-y-2 text-cinema-600 dark:text-cinema-300 text-sm">
          <li>Vale-Presentes do TatoFilmes são válidos em todas as nossas unidades</li>
          <li>O prazo de validade é contado a partir da data de compra</li>
          <li>Não é possível trocar o Vale-Presente por dinheiro</li>
          <li>Em caso de perda ou extravio, não é possível emitir uma segunda via</li>
          <li>Para utilizar seu Vale-Presente, basta apresentar o código ou QR Code na bilheteria</li>
          <li>Para mais informações, entre em contato com nossa Central de Atendimento</li>
        </ul>
      </motion.div>
    </PageLayout>
  );
};

export default GiftCards;

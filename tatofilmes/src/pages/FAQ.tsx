
import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';

const FAQ = () => {
  const categories = [
    "Ingressos e Reservas",
    "Experiência no Cinema",
    "Alimentos e Bebidas",
    "Programa de Fidelidade",
    "Problemas Técnicos"
  ];

  const faqContent = {
    "Ingressos e Reservas": [
      {
        question: "Como posso comprar ingressos online?",
        answer: "Você pode comprar ingressos através do nosso site ou aplicativo móvel. Basta selecionar o filme, sessão e assentos desejados, fazer login (ou cadastro para novos usuários) e concluir o pagamento com cartão de crédito, débito ou PIX."
      },
      {
        question: "É possível reservar assentos sem pagamento antecipado?",
        answer: "Não oferecemos reserva de assentos sem pagamento antecipado. Para garantir seu lugar, é necessário concluir a compra do ingresso."
      },
      {
        question: "Posso escolher meus assentos na compra online?",
        answer: "Sim, nosso sistema permite visualizar e escolher assentos específicos durante o processo de compra, tanto online quanto nas bilheterias."
      },
      {
        question: "Qual a política de reembolso ou troca de ingressos?",
        answer: "Oferecemos reembolso total para cancelamentos realizados até 2 horas antes da sessão. Após esse prazo, não é possível solicitar reembolso. Trocas para outra sessão do mesmo filme podem ser feitas até 1 hora antes, sujeitas à disponibilidade."
      },
      {
        question: "Como funciona a meia-entrada?",
        answer: "Oferecemos meia-entrada para estudantes, idosos, pessoas com deficiência, professores da rede pública e jovens de baixa renda, conforme legislação vigente. É necessário apresentar documentação comprobatória na entrada do cinema."
      }
    ],
    "Experiência no Cinema": [
      {
        question: "Qual é a política para crianças?",
        answer: "Crianças menores de 10 anos devem estar acompanhadas por um responsável maior de 18 anos. Seguimos rigorosamente a classificação indicativa dos filmes, conforme determinado pelo Ministério da Justiça."
      },
      {
        question: "É permitido entrar com alimentos ou bebidas externos?",
        answer: "Não é permitida a entrada com alimentos e bebidas adquiridos fora do cinema. Oferecemos uma variedade de opções em nossa bomboniere para complementar sua experiência."
      },
      {
        question: "Como funciona o sistema de som e imagem nas salas?",
        answer: "Nossas salas são equipadas com projetores 4K a laser e sistemas de som Dolby Atmos, proporcionando uma experiência audiovisual imersiva de alta qualidade."
      },
      {
        question: "Vocês têm sessões para pessoas com necessidades especiais?",
        answer: "Sim, oferecemos sessões adaptadas para pessoas com deficiência auditiva (legendadas) e visual (com audiodescrição), além de acessibilidade para cadeirantes em todas as salas."
      }
    ],
    "Alimentos e Bebidas": [
      {
        question: "Quais opções de alimentos e bebidas são oferecidas?",
        answer: "Além das tradicionais pipocas e refrigerantes, oferecemos uma seleção gourmet que inclui nachos, chocolates importados, cafés especiais, bebidas alcoólicas selecionadas e combos exclusivos."
      },
      {
        question: "É possível fazer pedidos antecipados de alimentos?",
        answer: "Sim, você pode fazer pedidos antecipados ao comprar seus ingressos online ou através do nosso aplicativo, evitando filas na bomboniere."
      },
      {
        question: "Vocês oferecem opções para dietas especiais?",
        answer: "Sim, dispomos de opções para dietas veganas, vegetarianas, sem glúten e sem lactose em nosso cardápio. Consulte as opções disponíveis na bomboniere."
      }
    ],
    "Programa de Fidelidade": [
      {
        question: "Como funciona o programa de fidelidade TatoFans?",
        answer: "A cada ingresso comprado, você acumula pontos que podem ser trocados por ingressos gratuitos, combos e produtos exclusivos. Membros também recebem descontos especiais e acesso antecipado a pré-vendas."
      },
      {
        question: "Como me inscrevo no programa de fidelidade?",
        answer: "Você pode se inscrever gratuitamente em nosso site, aplicativo ou nas bilheterias físicas. Basta fornecer seus dados básicos para começar a acumular pontos imediatamente."
      },
      {
        question: "Os pontos expiram?",
        answer: "Sim, os pontos têm validade de 12 meses a partir da data em que foram adquiridos. Recomendamos utilizá-los regularmente para aproveitar ao máximo os benefícios."
      }
    ],
    "Problemas Técnicos": [
      {
        question: "O que fazer se encontrar problemas ao comprar ingressos online?",
        answer: "Se encontrar dificuldades, tente atualizar a página, limpar o cache do navegador ou usar outro dispositivo. Se o problema persistir, entre em contato com nosso suporte técnico pelo e-mail suporte@tatofilmes.com.br ou telefone (21) 3333-4444."
      },
      {
        question: "Como proceder se houver problemas técnicos durante a exibição do filme?",
        answer: "Informe imediatamente a um de nossos funcionários. Em caso de problemas técnicos significativos que afetem a exibição, oferecemos reembolso total ou ingressos para outra sessão."
      },
      {
        question: "É possível recuperar uma compra não finalizada?",
        answer: "Se o pagamento foi processado mas você não recebeu a confirmação, verifique seu e-mail (incluindo a pasta de spam) ou entre em contato com nosso atendimento. Mantenha o comprovante de pagamento para verificação."
      }
    ]
  };

  return (
    <PageLayout 
      title="Perguntas Frequentes" 
      subtitle="Encontre respostas para as dúvidas mais comuns sobre nossos serviços"
      bgImageUrl="https://source.unsplash.com/random/1920x1080/?cinema,question"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center relative mb-8">
            <input
              type="text"
              placeholder="Buscar perguntas frequentes..."
              className="w-full py-4 px-5 pr-12 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-cinema-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-red"
            />
            <Button className="absolute right-1 top-1 bottom-1 rounded-full aspect-square" size="icon">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue={categories[0]} className="w-full">
            <TabsList className="w-full overflow-x-auto flex flex-nowrap justify-start p-1 mb-6">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="whitespace-nowrap flex-shrink-0 data-[state=active]:bg-accent-red data-[state=active]:text-white"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {categories.map((category) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="bg-white dark:bg-cinema-900 rounded-xl shadow-md border border-gray-100 dark:border-gray-800 p-6">
                  <Accordion type="single" collapsible className="w-full">
                    {faqContent[category].map((item, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-lg font-medium text-cinema-900 dark:text-white py-4">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-cinema-600 dark:text-cinema-300 text-base pb-4">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <h3 className="text-xl font-bold text-cinema-900 dark:text-white mb-4">
            Não encontrou o que procurava?
          </h3>
          <p className="text-cinema-600 dark:text-cinema-300 mb-6">
            Nossa equipe de atendimento está pronta para ajudar com qualquer dúvida adicional.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-accent-red to-accent-lightred hover:from-accent-darkred hover:to-accent-red">
              Fale Conosco
            </Button>
            <Button variant="outline">
              Chat ao Vivo
            </Button>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default FAQ;

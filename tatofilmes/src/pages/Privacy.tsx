
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Database, Settings, Clock, MessageSquare } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Privacy = () => {
  const highlights = [
    {
      icon: <Shield className="h-6 w-6 text-accent-red" />,
      title: "Proteção de Dados",
      description: "Seguimos rigorosas medidas para proteger suas informações pessoais"
    },
    {
      icon: <Eye className="h-6 w-6 text-accent-red" />,
      title: "Transparência",
      description: "Clareza sobre quais dados coletamos e como os utilizamos"
    },
    {
      icon: <Settings className="h-6 w-6 text-accent-red" />,
      title: "Controle do Usuário",
      description: "Você tem controle sobre suas informações pessoais"
    }
  ];

  const faqs = [
    {
      question: "Quais informações pessoais vocês coletam?",
      answer: "Coletamos informações como nome, email, número de telefone, endereço, histórico de compras, preferências de filmes e dados de pagamento. Também podemos coletar informações sobre como você utiliza nosso site e aplicativo."
    },
    {
      question: "Como vocês usam cookies e tecnologias semelhantes?",
      answer: "Utilizamos cookies e tecnologias similares para melhorar sua experiência em nosso site, lembrar suas preferências, personalizar conteúdo e anúncios, e analisar como nossos sites são utilizados. Você pode gerenciar suas preferências de cookies em seu navegador."
    },
    {
      question: "Vocês compartilham meus dados com terceiros?",
      answer: "Podemos compartilhar seus dados com parceiros de serviço que nos ajudam a operar nosso negócio, como processadores de pagamento e prestadores de serviços de análise. Também podemos compartilhar informações quando exigido por lei ou para proteger nossos direitos."
    },
    {
      question: "Por quanto tempo vocês retêm meus dados?",
      answer: "Mantemos seus dados pelo tempo necessário para fornecer nossos serviços, cumprir obrigações legais e resolver disputas. O período de retenção varia de acordo com o tipo de dado e sua finalidade."
    },
    {
      question: "Como posso acessar ou excluir meus dados pessoais?",
      answer: "Você pode acessar, atualizar ou solicitar a exclusão de seus dados pessoais através da sua conta em nosso site ou entrando em contato com nosso Encarregado de Proteção de Dados pelo email privacidade@tatofilmes.com.br."
    }
  ];

  return (
    <PageLayout 
      title="Política de Privacidade" 
      subtitle="Valorizamos sua privacidade e queremos que você entenda como coletamos, usamos e protegemos suas informações"
      bgImageUrl="https://source.unsplash.com/random/1920x1080/?privacy,secure"
    >
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {highlights.map((item, index) => (
          <div key={index} className="bg-white dark:bg-cinema-900 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-800">
            <div className="p-3 bg-accent-red/10 rounded-full w-fit mb-4">
              {item.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2 text-cinema-900 dark:text-white">{item.title}</h3>
            <p className="text-cinema-600 dark:text-cinema-400">{item.description}</p>
          </div>
        ))}
      </motion.div>

      <div className="bg-white dark:bg-cinema-900 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto">
          <p className="text-cinema-600 dark:text-cinema-300 italic mb-8">
            Última atualização: 01 de agosto de 2023
          </p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-xl font-bold text-cinema-900 dark:text-white mb-4">Introdução</h2>
            <p className="text-cinema-700 dark:text-cinema-300 mb-4">
              O TatoFilmes ("nós", "nosso" ou "empresa") valoriza a sua privacidade e está comprometido em proteger seus dados pessoais. 
              Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e compartilhamos suas informações quando você 
              utiliza nossos serviços, incluindo nosso site, aplicativo móvel, compra de ingressos e visitas aos nossos cinemas.
            </p>
            <p className="text-cinema-700 dark:text-cinema-300 mb-6">
              Esta política foi elaborada em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD) e outras 
              leis de privacidade aplicáveis. Ao utilizar nossos serviços, você concorda com as práticas descritas nesta política.
            </p>
          </motion.div>

          <Separator className="my-8" />

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center mb-4">
              <Database className="h-6 w-6 text-accent-red mr-2" />
              <h2 className="text-xl font-bold text-cinema-900 dark:text-white">Dados que Coletamos</h2>
            </div>
            
            <p className="text-cinema-700 dark:text-cinema-300 mb-4">
              Podemos coletar diferentes tipos de informações pessoais, dependendo de como você interage conosco:
            </p>
            
            <ul className="list-disc pl-6 space-y-2 text-cinema-700 dark:text-cinema-300 mb-6">
              <li>Informações de identificação (nome, data de nascimento, CPF)</li>
              <li>Informações de contato (email, telefone, endereço)</li>
              <li>Informações de pagamento (dados de cartão de crédito, histórico de compras)</li>
              <li>Preferências e histórico de filmes assistidos</li>
              <li>Dados de uso do site e aplicativo</li>
              <li>Informações coletadas através de cookies e tecnologias similares</li>
            </ul>
          </motion.div>

          <Separator className="my-8" />

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center mb-4">
              <Lock className="h-6 w-6 text-accent-red mr-2" />
              <h2 className="text-xl font-bold text-cinema-900 dark:text-white">Como Protegemos seus Dados</h2>
            </div>
            
            <p className="text-cinema-700 dark:text-cinema-300 mb-4">
              Implementamos medidas técnicas e organizacionais apropriadas para proteger seus dados pessoais contra 
              acesso não autorizado, perda acidental ou alteração. Estas medidas incluem:
            </p>
            
            <ul className="list-disc pl-6 space-y-2 text-cinema-700 dark:text-cinema-300 mb-6">
              <li>Criptografia de dados sensíveis</li>
              <li>Acesso restrito a informações pessoais</li>
              <li>Monitoramento contínuo de nossos sistemas</li>
              <li>Treinamento regular de funcionários sobre práticas de segurança de dados</li>
              <li>Avaliações periódicas de segurança e testes de vulnerabilidade</li>
            </ul>
          </motion.div>

          <Separator className="my-8" />

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="flex items-center mb-4">
              <Clock className="h-6 w-6 text-accent-red mr-2" />
              <h2 className="text-xl font-bold text-cinema-900 dark:text-white">Período de Retenção</h2>
            </div>
            
            <p className="text-cinema-700 dark:text-cinema-300 mb-6">
              Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir os propósitos para os quais 
              foram coletados, incluindo o cumprimento de requisitos legais, contábeis ou de relatórios. Para determinar 
              o período de retenção apropriado, consideramos a quantidade, natureza e sensibilidade dos dados pessoais, 
              o risco potencial de danos por uso não autorizado ou divulgação, e os requisitos legais aplicáveis.
            </p>
          </motion.div>

          <Separator className="my-8" />

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="flex items-center mb-6">
              <MessageSquare className="h-6 w-6 text-accent-red mr-2" />
              <h2 className="text-xl font-bold text-cinema-900 dark:text-white">Perguntas Frequentes</h2>
            </div>
            
            <Accordion type="single" collapsible className="mb-6">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-cinema-900 dark:text-white">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-cinema-700 dark:text-cinema-300">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-12 bg-cinema-50 dark:bg-cinema-800/30 p-6 rounded-lg"
          >
            <h3 className="text-lg font-semibold text-cinema-900 dark:text-white mb-3">
              Contato do Encarregado de Proteção de Dados
            </h3>
            <p className="text-cinema-700 dark:text-cinema-300">
              Se você tiver dúvidas ou solicitações relacionadas a seus dados pessoais, entre em contato com nosso 
              Encarregado de Proteção de Dados (DPO):
            </p>
            <p className="text-cinema-700 dark:text-cinema-300 mt-2">
              E-mail: privacidade@tatofilmes.com.br<br />
              Telefone: (21) 3333-4455<br />
              Endereço: Av. Atlântica, 1702, Copacabana, Rio de Janeiro - RJ, 22021-001
            </p>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Privacy;

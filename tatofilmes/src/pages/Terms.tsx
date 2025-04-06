
import React from 'react';
import { motion } from 'framer-motion';
import PageLayout from '@/components/layout/PageLayout';
import { Separator } from '@/components/ui/separator';

const Terms = () => {
  const sections = [
    {
      title: "1. Termos de Uso",
      content: [
        "Bem-vindo aos Termos de Uso do TatoFilmes. Este acordo legal ('Termos') entre você e TatoFilmes Entretenimento Ltda. ('TatoFilmes', 'nós', 'nosso') estabelece os termos e condições para o uso dos nossos serviços, incluindo nosso site, aplicativo móvel e serviços relacionados (coletivamente, os 'Serviços').",
        "Ao acessar ou utilizar nossos Serviços, você concorda com estes Termos. Se você não concordar com qualquer parte destes Termos, por favor, não utilize nossos Serviços."
      ]
    },
    {
      title: "2. Uso dos Serviços",
      content: [
        "2.1 Elegibilidade: Você deve ter pelo menos 13 anos de idade para utilizar nossos Serviços. Se você tem entre 13 e 18 anos, deve contar com a supervisão de um responsável legal.",
        "2.2 Conta: Algumas funcionalidades de nossos Serviços exigem registro. Você é responsável por manter a confidencialidade de suas credenciais de acesso e por todas as atividades realizadas em sua conta.",
        "2.3 Uso Aceitável: Você concorda em utilizar nossos Serviços apenas para finalidades legítimas e de acordo com estes Termos. Você não deve:",
        "• Violar leis ou regulamentos aplicáveis",
        "• Infringir direitos de propriedade intelectual",
        "• Disseminar conteúdo ilegal, ofensivo ou prejudicial",
        "• Interferir na segurança ou funcionalidade dos Serviços",
        "• Realizar engenharia reversa ou tentativas de acesso não autorizado"
      ]
    },
    {
      title: "3. Ingressos e Pagamentos",
      content: [
        "3.1 Compra de Ingressos: Ao adquirir ingressos através de nossos Serviços, você está sujeito às políticas específicas de cada transação, incluindo políticas de reembolso e troca.",
        "3.2 Precisão das Informações: Todos os preços, disponibilidade de assentos e informações de exibição estão sujeitos a alterações. Embora nos esforcemos para fornecer informações precisas, não podemos garantir a ausência total de erros.",
        "3.3 Pagamentos: Ao fornecer informações de pagamento, você garante que está autorizado a usar o método de pagamento fornecido e que as informações são verdadeiras e precisas."
      ]
    },
    {
      title: "4. Política de Cancelamento",
      content: [
        "4.1 Cancelamentos pelo Cliente: Os ingressos adquiridos podem ser cancelados até 2 horas antes da sessão, sujeitos a uma taxa administrativa de 10% do valor do ingresso.",
        "4.2 Cancelamentos pelo TatoFilmes: Em caso de cancelamento de uma sessão por nossa parte, ofereceremos um reembolso total ou a possibilidade de remarcar para outra sessão, a critério do cliente.",
        "4.3 Eventos de Força Maior: Não seremos responsáveis por falhas no cumprimento de nossas obrigações devido a eventos fora de nosso controle razoável."
      ]
    },
    {
      title: "5. Conduta nos Cinemas",
      content: [
        "Ao frequentar nossas instalações físicas, você concorda em cumprir todas as regras e orientações divulgadas, incluindo, mas não se limitando a:",
        "• Respeitar a classificação indicativa dos filmes",
        "• Não utilizar equipamentos de gravação durante as exibições",
        "• Não perturbar outros clientes",
        "• Seguir orientações de segurança e emergência",
        "• Respeitar nossas políticas sobre alimentos e bebidas externos"
      ]
    },
    {
      title: "6. Limitação de Responsabilidade",
      content: [
        "Na extensão máxima permitida pela lei aplicável, o TatoFilmes não será responsável por quaisquer danos indiretos, incidentais, especiais, consequenciais ou punitivos, incluindo perda de lucros, dados ou uso, resultantes do seu acesso ou uso dos Serviços."
      ]
    },
    {
      title: "7. Alterações nos Termos",
      content: [
        "Reservamo-nos o direito de modificar estes Termos a qualquer momento. As alterações entrarão em vigor após publicação nos Serviços. O uso continuado dos Serviços após tais modificações constitui sua aceitação dos novos Termos."
      ]
    }
  ];

  return (
    <PageLayout 
      title="Termos e Condições" 
      subtitle="Leia atentamente os termos e condições que regem o uso dos nossos serviços"
      bgImageUrl="https://source.unsplash.com/random/1920x1080/?cinema,document"
    >
      <div className="bg-white dark:bg-cinema-900 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto">
          <p className="text-cinema-600 dark:text-cinema-300 italic mb-8">
            Última atualização: 01 de agosto de 2023
          </p>

          {sections.map((section, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="mb-8"
            >
              <h2 className="text-xl font-bold text-cinema-900 dark:text-white mb-4">
                {section.title}
              </h2>
              
              <div className="space-y-4">
                {section.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-cinema-700 dark:text-cinema-300">
                    {paragraph}
                  </p>
                ))}
              </div>
              
              {index < sections.length - 1 && (
                <Separator className="my-8" />
              )}
            </motion.div>
          ))}
          
          <div className="mt-12 bg-cinema-50 dark:bg-cinema-800/30 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-cinema-900 dark:text-white mb-3">
              Contato
            </h3>
            <p className="text-cinema-700 dark:text-cinema-300">
              Se você tiver dúvidas ou comentários sobre estes Termos, por favor entre em contato conosco:
            </p>
            <p className="text-cinema-700 dark:text-cinema-300 mt-2">
              E-mail: jurídico@tatofilmes.com.br<br />
              Telefone: (21) 3333-4444<br />
              Endereço: Av. Atlântica, 1702, Copacabana, Rio de Janeiro - RJ, 22021-001
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Terms;

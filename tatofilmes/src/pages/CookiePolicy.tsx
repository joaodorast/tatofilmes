
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Cookie, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';

const CookiePolicy = () => {
  const cookieTypes = [
    {
      title: "Cookies Essenciais",
      description: "Necessários para o funcionamento básico do site. Eles permitem a navegação e o uso de recursos essenciais.",
      icon: <Shield className="h-10 w-10 text-accent-red" />,
      examples: ["Autenticação", "Segurança", "Preferências de uso"]
    },
    {
      title: "Cookies Analíticos",
      description: "Coletam informações sobre como os usuários interagem com nosso site, permitindo-nos melhorar a experiência.",
      icon: <Cookie className="h-10 w-10 text-accent-red" />,
      examples: ["Google Analytics", "Estatísticas de uso", "Testes A/B"]
    },
    {
      title: "Cookies de Sessão",
      description: "Ativos apenas durante sua visita e são excluídos quando você fecha o navegador.",
      icon: <Clock className="h-10 w-10 text-accent-red" />,
      examples: ["Carrinho de compras", "Formulários", "Sessões de usuário"]
    },
    {
      title: "Cookies de Marketing",
      description: "Utilizados para exibir anúncios relevantes e rastrear campanhas de marketing.",
      icon: <AlertCircle className="h-10 w-10 text-accent-red" />,
      examples: ["Publicidade direcionada", "Redes sociais", "Remarketing"]
    }
  ];

  return (
    <PageLayout 
      title="Política de Cookies" 
      subtitle="Entenda como utilizamos cookies para melhorar sua experiência no TatoFilmes"
      bgImageUrl="https://source.unsplash.com/random/1920x1080/?privacy,policy"
    >
      <div className="mb-16">
        <motion.h2 
          className="heading-sm text-cinema-900 dark:text-white text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          O que são Cookies?
        </motion.h2>
        
        <motion.div 
          className="bg-white dark:bg-cinema-900 p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-cinema-700 dark:text-cinema-300 mb-4">
            Cookies são pequenos arquivos de texto que são armazenados no seu dispositivo (computador, smartphone ou tablet) 
            quando você visita um site. Eles são amplamente utilizados para fazer os sites funcionarem de maneira mais eficiente, 
            além de fornecer informações aos proprietários do site.
          </p>
          
          <p className="text-cinema-700 dark:text-cinema-300 mb-4">
            No TatoFilmes, utilizamos cookies para melhorar sua experiência de navegação, personalizar conteúdo e anúncios, 
            fornecer recursos de mídia social e analisar o tráfego do nosso site. Também compartilhamos informações sobre o 
            uso do nosso site com nossos parceiros de mídia social, publicidade e análise.
          </p>
          
          <p className="text-cinema-700 dark:text-cinema-300">
            Ao continuar a navegar em nosso site, você concorda com o uso de cookies de acordo com esta política. 
            Você pode ajustar as configurações do seu navegador para recusar cookies, mas isso pode afetar sua 
            experiência no nosso site.
          </p>
        </motion.div>
      </div>

      <div className="mb-16">
        <motion.h2 
          className="heading-sm text-cinema-900 dark:text-white text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Tipos de Cookies que Utilizamos
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {cookieTypes.map((cookie, index) => (
            <motion.div 
              key={index}
              className="bg-white dark:bg-cinema-900 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-800 flex gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <div className="flex-shrink-0">
                {cookie.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-cinema-900 dark:text-white">{cookie.title}</h3>
                <p className="text-cinema-600 dark:text-cinema-300 mb-4">{cookie.description}</p>
                <div>
                  <span className="text-sm font-semibold text-cinema-900 dark:text-white">Exemplos: </span>
                  <span className="text-sm text-cinema-600 dark:text-cinema-400">{cookie.examples.join(", ")}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div 
        className="bg-cinema-50 dark:bg-cinema-800 rounded-xl p-8 mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="heading-sm text-cinema-900 dark:text-white text-center mb-6">Como Gerenciar Cookies</h2>
          
          <p className="text-cinema-600 dark:text-cinema-300 mb-6">
            Você pode controlar e gerenciar cookies de várias maneiras. Lembre-se que remover ou bloquear cookies 
            pode impactar sua experiência de usuário e partes do nosso site podem não funcionar corretamente.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-accent-red flex-shrink-0 mt-0.5 mr-2" />
              <div>
                <h3 className="text-md font-semibold text-cinema-900 dark:text-white">Configurações do Navegador</h3>
                <p className="text-cinema-600 dark:text-cinema-400 text-sm">
                  A maioria dos navegadores permite controlar cookies através das configurações. Procure pela seção de "Configurações", 
                  "Privacidade" ou "Cookies" no menu do seu navegador.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-accent-red flex-shrink-0 mt-0.5 mr-2" />
              <div>
                <h3 className="text-md font-semibold text-cinema-900 dark:text-white">Banner de Cookies</h3>
                <p className="text-cinema-600 dark:text-cinema-400 text-sm">
                  Quando você visita nosso site pela primeira vez, um banner de cookies aparece, permitindo que você 
                  aceite ou recuse cookies não essenciais.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-accent-red flex-shrink-0 mt-0.5 mr-2" />
              <div>
                <h3 className="text-md font-semibold text-cinema-900 dark:text-white">Ferramentas de Terceiros</h3>
                <p className="text-cinema-600 dark:text-cinema-400 text-sm">
                  Existem ferramentas online como "Opt-out" para publicidade baseada em interesses que permitem 
                  controlar a coleta de dados por redes de publicidade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mb-16">
        <motion.h2 
          className="heading-sm text-cinema-900 dark:text-white text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          Política de Retenção de Cookies
        </motion.h2>
        
        <motion.div 
          className="bg-white dark:bg-cinema-900 p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          <p className="text-cinema-700 dark:text-cinema-300 mb-4">
            Diferentes cookies permanecem em seu dispositivo por diferentes períodos de tempo:
          </p>
          
          <ul className="list-disc pl-5 space-y-2 text-cinema-700 dark:text-cinema-300 mb-4">
            <li>
              <span className="font-medium">Cookies de Sessão:</span> Existem temporariamente enquanto você navega pelo site e são 
              excluídos quando você fecha o navegador.
            </li>
            <li>
              <span className="font-medium">Cookies Persistentes:</span> Permanecem no seu dispositivo mesmo após o fechamento do 
              navegador, até expirarem ou serem excluídos manualmente. Eles nos ajudam a reconhecê-lo como um 
              visitante recorrente e adaptar a experiência de acordo.
            </li>
          </ul>
          
          <p className="text-cinema-700 dark:text-cinema-300">
            Os períodos de expiração específicos variam de acordo com o propósito do cookie. Por exemplo, cookies 
            relacionados a preferências de usuário podem durar até 1 ano, enquanto cookies analíticos podem expirar 
            em poucos meses.
          </p>
        </motion.div>
      </div>

      <motion.div 
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        <h3 className="text-xl font-semibold mb-4 text-cinema-900 dark:text-white">
          Atualizações nesta Política
        </h3>
        <p className="text-cinema-600 dark:text-cinema-300">
          Podemos atualizar esta Política de Cookies periodicamente para refletir mudanças em nossas práticas de coleta de dados.<br />
          A data da última atualização será sempre indicada no topo desta página.
        </p>
        <p className="mt-4 text-cinema-900 dark:text-white font-medium">
          Última atualização: 10 de agosto de 2023
        </p>
      </motion.div>
    </PageLayout>
  );
};

export default CookiePolicy;

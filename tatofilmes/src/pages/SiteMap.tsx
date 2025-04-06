
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { Separator } from '@/components/ui/separator';

const SiteMap = () => {
  const siteStructure = [
    {
      category: "Páginas Principais",
      links: [
        { name: "Página Inicial", path: "/" },
        { name: "Filmes em Cartaz", path: "/movies" },
        { name: "Em Breve", path: "/coming-soon" },
        { name: "Sobre Nós", path: "/about" }
      ]
    },
    {
      category: "Conta e Perfil",
      links: [
        { name: "Entrar", path: "/login" },
        { name: "Cadastrar", path: "/register" },
        { name: "Meu Perfil", path: "/profile" },
        { name: "Meus Pedidos", path: "/my-orders" }
      ]
    },
    {
      category: "Compras",
      links: [
        { name: "Carrinho", path: "/cart" },
        { name: "Checkout", path: "/checkout" },
        { name: "Vale-Presentes", path: "/gift-cards" },
        { name: "Promoções", path: "/promotions" }
      ]
    },
    {
      category: "Informações",
      links: [
        { name: "Perguntas Frequentes", path: "/faq" },
        { name: "Notícias e Eventos", path: "/news" },
        { name: "Carreiras", path: "/careers" },
        { name: "Política de Privacidade", path: "/privacy" },
        { name: "Termos e Condições", path: "/terms" },
        { name: "Política de Cookies", path: "/cookie-policy" },
        { name: "Acessibilidade", path: "/accessibility" }
      ]
    }
  ];

  return (
    <PageLayout 
      title="Mapa do Site" 
      subtitle="Encontre facilmente todas as páginas disponíveis no TatoFilmes"
      bgImageUrl="https://source.unsplash.com/random/1920x1080/?map,navigation"
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-cinema-900 rounded-xl shadow-md border border-gray-100 dark:border-gray-800 p-8 mb-12">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8"
          >
            {siteStructure.map((section, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <h2 className="text-xl font-bold text-accent-red mb-4">{section.category}</h2>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        to={link.path}
                        className="text-cinema-700 dark:text-cinema-300 hover:text-accent-red dark:hover:text-accent-red transition-colors flex items-center"
                      >
                        <svg className="w-3 h-3 mr-2 text-accent-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-xl font-bold text-cinema-900 dark:text-white mb-6">
            Complexos de Cinema
          </h2>
          
          <div className="bg-white dark:bg-cinema-900 rounded-xl shadow-md border border-gray-100 dark:border-gray-800 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  name: "TatoFilmes Copacabana",
                  address: "Av. Atlântica, 1702, Copacabana",
                  phone: "(21) 3333-4444"
                },
                {
                  name: "TatoFilmes Barra",
                  address: "Av. das Américas, 4666, Barra da Tijuca",
                  phone: "(21) 3333-5555"
                },
                {
                  name: "TatoFilmes Norte Shopping",
                  address: "Av. Dom Hélder Câmara, 5474, Cachambi",
                  phone: "(21) 3333-6666"
                },
                {
                  name: "TatoFilmes Botafogo",
                  address: "Rua Voluntários da Pátria, 340, Botafogo",
                  phone: "(21) 3333-7777"
                }
              ].map((cinema, index) => (
                <div key={index} className="p-4 border border-gray-100 dark:border-gray-800 rounded-lg">
                  <h3 className="text-lg font-semibold text-cinema-900 dark:text-white mb-2">{cinema.name}</h3>
                  <p className="text-cinema-600 dark:text-cinema-400">{cinema.address}</p>
                  <p className="text-cinema-600 dark:text-cinema-400">{cinema.phone}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <Separator className="my-12" />

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <h2 className="text-xl font-bold text-cinema-900 dark:text-white mb-4">
            Não encontrou o que procurava?
          </h2>
          <p className="text-cinema-600 dark:text-cinema-300">
            Entre em contato com nossa equipe de suporte:
          </p>
          <p className="text-cinema-900 dark:text-white font-medium mt-2">
            Email: contato@tatofilmes.com.br<br />
            Telefone: (21) 3333-4444
          </p>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default SiteMap;

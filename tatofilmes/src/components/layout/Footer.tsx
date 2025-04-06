
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-cinema-950 border-t border-gray-200 dark:border-gray-800">
      <div className="cinema-container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Coluna 1: Logo e Descrição */}
          <div className="space-y-4">
            <div className="text-2xl font-bold">
              <span className="text-accent-red">Tato</span>
              <span className="text-cinema-800 dark:text-white">Filmes</span>
            </div>
            <p className="text-cinema-600 dark:text-cinema-300 max-w-xs">
              Experimente a magia do cinema com tecnologia de ponta e conforto inigualável.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-cinema-400 hover:text-accent-red transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-cinema-400 hover:text-accent-red transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-cinema-400 hover:text-accent-red transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-cinema-400 hover:text-accent-red transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Coluna 2: Links Rápidos */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-cinema-900 dark:text-white">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/movies" className="text-cinema-600 dark:text-cinema-300 hover:text-accent-red dark:hover:text-accent-red transition-colors">
                  Filmes
                </Link>
              </li>
              <li>
                <Link to="/coming-soon" className="text-cinema-600 dark:text-cinema-300 hover:text-accent-red dark:hover:text-accent-red transition-colors">
                  Em Breve
                </Link>
              </li>
              <li>
                <Link to="/promotions" className="text-cinema-600 dark:text-cinema-300 hover:text-accent-red dark:hover:text-accent-red transition-colors">
                  Promoções
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-cinema-600 dark:text-cinema-300 hover:text-accent-red dark:hover:text-accent-red transition-colors">
                  Notícias e Eventos
                </Link>
              </li>
              <li>
                <Link to="/gift-cards" className="text-cinema-600 dark:text-cinema-300 hover:text-accent-red dark:hover:text-accent-red transition-colors">
                  Vale-Presentes
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Coluna 3: Informações */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-cinema-900 dark:text-white">Informações</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-cinema-600 dark:text-cinema-300 hover:text-accent-red dark:hover:text-accent-red transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-cinema-600 dark:text-cinema-300 hover:text-accent-red dark:hover:text-accent-red transition-colors">
                  Carreiras
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-cinema-600 dark:text-cinema-300 hover:text-accent-red dark:hover:text-accent-red transition-colors">
                  Termos e Condições
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-cinema-600 dark:text-cinema-300 hover:text-accent-red dark:hover:text-accent-red transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-cinema-600 dark:text-cinema-300 hover:text-accent-red dark:hover:text-accent-red transition-colors">
                  Perguntas Frequentes
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Coluna 4: Contato */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-cinema-900 dark:text-white">Fale Conosco</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-accent-red mr-2 mt-0.5" />
                <span className="text-cinema-600 dark:text-cinema-300">
                  Av. Atlântica, 1702, Copacabana, Rio de Janeiro - RJ, 22021-001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-accent-red mr-2" />
                <span className="text-cinema-600 dark:text-cinema-300">
                  +55 (21) 3333-4444
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-accent-red mr-2" />
                <span className="text-cinema-600 dark:text-cinema-300">
                  contato@tatofilmes.com.br
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Seção inferior */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-10 pt-6 text-center md:flex md:items-center md:justify-between">
          <p className="text-cinema-500 dark:text-cinema-400 text-sm">
            &copy; {currentYear} TatoFilmes. Todos os direitos reservados.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex flex-wrap justify-center md:justify-end space-x-4 text-sm">
              <li>
                <Link to="/accessibility" className="text-cinema-500 dark:text-cinema-400 hover:text-accent-red dark:hover:text-accent-red transition-colors">
                  Acessibilidade
                </Link>
              </li>
              <li>
                <Link to="/sitemap" className="text-cinema-500 dark:text-cinema-400 hover:text-accent-red dark:hover:text-accent-red transition-colors">
                  Mapa do Site
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="text-cinema-500 dark:text-cinema-400 hover:text-accent-red dark:hover:text-accent-red transition-colors">
                  Política de Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

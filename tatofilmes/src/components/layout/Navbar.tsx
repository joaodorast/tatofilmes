
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Moon, 
  Sun, 
  Menu, 
  X, 
  User, 
  ShoppingCart, 
  Package,
  LogOut,
  LogIn,
  UserPlus
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();
  const { getTotalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [cartItemsCount, setCartItemsCount] = useState(0);

  // Atualizar contagem de itens do carrinho
  useEffect(() => {
    setCartItemsCount(getTotalItems());
  }, [getTotalItems, location.pathname]);

  // Lidar com efeito de rolagem
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fechar menu mobile quando a rota muda
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Filmes', path: '/movies' },
    { name: 'Em Breve', path: '/coming-soon' },
    { name: 'Sobre', path: '/about' },
  ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 dark:bg-cinema-950/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold"
            >
              <span className="text-accent-red">Tato</span>
              <span className="text-cinema-800 dark:text-white">Filmes</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <ul className="flex items-center space-x-1">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === link.path 
                        ? 'text-accent-red' 
                        : 'text-cinema-700 dark:text-cinema-200 hover:text-accent-red dark:hover:text-accent-red'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="flex items-center ml-4 space-x-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleTheme}
                className="rounded-full"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-yellow-400" />
                ) : (
                  <Moon className="h-5 w-5 text-cinema-700" />
                )}
              </Button>

              {isAuthenticated ? (
                <>
                  <Link to="/cart" className="relative">
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <ShoppingCart className="h-5 w-5" />
                      {cartItemsCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 bg-accent-red text-white text-xs w-5 h-5 flex items-center justify-center p-0 rounded-full">
                          {cartItemsCount}
                        </Badge>
                      )}
                    </Button>
                  </Link>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="rounded-full p-0 h-10 w-10 overflow-hidden">
                        <Avatar>
                          <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                          <AvatarFallback>{user ? getInitials(user.name) : 'U'}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/profile" className="flex items-center cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          <span>Perfil</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/my-orders" className="flex items-center cursor-pointer">
                          <Package className="mr-2 h-4 w-4" />
                          <span>Meus Pedidos</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout} className="flex items-center text-red-500 cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sair</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Button asChild variant="outline" className="rounded-full">
                    <Link to="/login" className="flex items-center">
                      <LogIn className="h-4 w-4 mr-2" />
                      <span>Entrar</span>
                    </Link>
                  </Button>

                  <Button asChild className="rounded-full bg-accent-red hover:bg-accent-red/90">
                    <Link to="/register" className="flex items-center">
                      <UserPlus className="h-4 w-4 mr-2" />
                      <span>Cadastrar</span>
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            {isAuthenticated && (
              <Link to="/cart" className="relative">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemsCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 bg-accent-red text-white text-xs w-5 h-5 flex items-center justify-center p-0 rounded-full">
                      {cartItemsCount}
                    </Badge>
                  )}
                </Button>
              </Link>
            )}
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-cinema-700" />
              )}
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-full"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-cinema-950 border-b border-gray-200 dark:border-gray-800"
          >
            <div className="container mx-auto py-4 px-4">
              <ul className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link 
                      to={link.path}
                      className={`block px-4 py-2 rounded-md text-base font-medium transition-colors ${
                        location.pathname === link.path 
                          ? 'text-accent-red bg-gray-100 dark:bg-cinema-900' 
                          : 'text-cinema-700 dark:text-cinema-200 hover:bg-gray-100 dark:hover:bg-cinema-900'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
                
                {isAuthenticated ? (
                  <>
                    <li className="pt-2 border-t border-gray-200 dark:border-gray-800">
                      <Link 
                        to="/profile"
                        className="flex items-center px-4 py-2 rounded-md text-base font-medium text-cinema-700 dark:text-cinema-200 hover:bg-gray-100 dark:hover:bg-cinema-900"
                      >
                        <User className="h-5 w-5 mr-2" />
                        Meu Perfil
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/my-orders"
                        className="flex items-center px-4 py-2 rounded-md text-base font-medium text-cinema-700 dark:text-cinema-200 hover:bg-gray-100 dark:hover:bg-cinema-900"
                      >
                        <Package className="h-5 w-5 mr-2" />
                        Meus Pedidos
                      </Link>
                    </li>
                    <li>
                      <button 
                        onClick={logout}
                        className="flex w-full items-center px-4 py-2 rounded-md text-base font-medium text-red-500 hover:bg-gray-100 dark:hover:bg-cinema-900"
                      >
                        <LogOut className="h-5 w-5 mr-2" />
                        Sair
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="pt-2 border-t border-gray-200 dark:border-gray-800">
                      <Link 
                        to="/login"
                        className="flex items-center px-4 py-2 rounded-md text-base font-medium text-cinema-700 dark:text-cinema-200 hover:bg-gray-100 dark:hover:bg-cinema-900"
                      >
                        <LogIn className="h-5 w-5 mr-2" />
                        Entrar
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/register"
                        className="block px-4 py-2 rounded-md text-base font-medium text-white bg-accent-red hover:bg-accent-red/90"
                      >
                        Cadastrar
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

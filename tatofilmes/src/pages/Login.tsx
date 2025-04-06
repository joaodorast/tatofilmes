
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Obter parâmetro redirect da URL 
  const redirectPath = new URLSearchParams(location.search).get('redirect');

  // Redirecionar se já estiver autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectPath || '/');
    }
  }, [isAuthenticated, navigate, redirectPath]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await login(email, password);
      // Redirecionar para a página solicitada ou para a home
      navigate(redirectPath || '/');
    } catch (error) {
      console.error('Erro de login:', error);
      // O toast de erro já é exibido no contexto de autenticação
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  // Para facilitar o teste, prefira esses dados
  const handleDemoLogin = () => {
    setEmail('joao@exemplo.com');
    setPassword('senha123');
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-16 px-4 md:px-6 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-cinema-950 dark:to-cinema-900">
        <motion.div
          className="max-w-md mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-lg dark:bg-cinema-900">
              <CardHeader className="text-center space-y-2">
                <CardTitle className="text-2xl font-bold">Entrar na sua conta</CardTitle>
                <CardDescription>
                  Bem-vindo de volta ao TatoFilmes
                </CardDescription>
                {redirectPath === 'checkout' && (
                  <div className="mt-2 p-2 bg-amber-50 dark:bg-amber-900/30 rounded-md border border-amber-200 dark:border-amber-800 text-sm text-amber-800 dark:text-amber-200">
                    Faça login para finalizar sua compra
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border-gray-300 dark:border-gray-700 focus:border-accent-red dark:focus:border-accent-red"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="password">Senha</Label>
                      <Link to="/forgot-password" className="text-xs text-accent-red hover:underline">
                        Esqueceu a senha?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border-gray-300 dark:border-gray-700 focus:border-accent-red dark:focus:border-accent-red"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-4 w-4" />
                        ) : (
                          <EyeIcon className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-accent-red to-accent-lightred hover:from-accent-darkred hover:to-accent-red"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Entrando...
                      </>
                    ) : (
                      'Entrar'
                    )}
                  </Button>
                </form>
                <div className="mt-4">
                  <Button 
                    type="button" 
                    className="w-full" 
                    variant="outline"
                    onClick={handleDemoLogin}
                  >
                    Usar conta de demonstração
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <p className="text-sm text-center text-cinema-600 dark:text-cinema-300">
                  Não tem uma conta?{' '}
                  <Link to="/register" className="text-accent-red hover:underline">
                    Cadastre-se
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
};

export default Login;

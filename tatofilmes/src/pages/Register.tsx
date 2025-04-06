
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Newsletter from '@/components/common/Newsletter';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const { register, isAuthenticated } = useAuth();
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

  const validate = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!email.trim()) newErrors.email = 'Email é obrigatório';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email inválido';
    
    if (!password) newErrors.password = 'Senha é obrigatória';
    else if (password.length < 6) newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    
    if (password !== confirmPassword) newErrors.confirmPassword = 'As senhas não coincidem';
    if (!agreeTerms) newErrors.agreeTerms = 'Você precisa concordar com os termos';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      await register(name, email, password);
      // Redirecionar para a página solicitada ou para a home
      navigate(redirectPath || '/');
    } catch (error) {
      console.error('Erro ao registrar:', error);
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

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-16 px-4 md:px-6 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-cinema-950 dark:to-cinema-900">
        <motion.div
          className="max-w-5xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <Card className="border-0 shadow-lg dark:bg-cinema-900">
                <CardHeader className="text-center space-y-2">
                  <CardTitle className="text-2xl font-bold">Criar uma conta</CardTitle>
                  <CardDescription>
                    Junte-se ao Cinema Universe e tenha acesso a recursos exclusivos
                  </CardDescription>
                  {redirectPath === 'checkout' && (
                    <div className="mt-2 p-2 bg-amber-50 dark:bg-amber-900/30 rounded-md border border-amber-200 dark:border-amber-800 text-sm text-amber-800 dark:text-amber-200">
                      Crie uma conta para finalizar sua compra
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome completo</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Seu nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border-gray-300 dark:border-gray-700 focus:border-accent-red dark:focus:border-accent-red"
                        required
                      />
                      {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-gray-300 dark:border-gray-700 focus:border-accent-red dark:focus:border-accent-red"
                        required
                      />
                      {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">Senha</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="border-gray-300 dark:border-gray-700 focus:border-accent-red dark:focus:border-accent-red"
                          required
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
                      {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmar senha</Label>
                      <Input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="border-gray-300 dark:border-gray-700 focus:border-accent-red dark:focus:border-accent-red"
                        required
                      />
                      {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="newsletter" 
                          checked={subscribeNewsletter}
                          onCheckedChange={(checked) => setSubscribeNewsletter(checked as boolean)}
                        />
                        <label
                          htmlFor="newsletter"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Desejo receber novidades, promoções e lançamentos por e-mail
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="terms" 
                          checked={agreeTerms}
                          onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Eu concordo com os{' '}
                          <Link to="/terms" className="text-accent-red hover:underline">
                            termos de uso
                          </Link>{' '}
                          e{' '}
                          <Link to="/privacy" className="text-accent-red hover:underline">
                            política de privacidade
                          </Link>
                        </label>
                      </div>
                      {errors.agreeTerms && <p className="text-xs text-red-500">{errors.agreeTerms}</p>}
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-accent-red to-accent-lightred hover:from-accent-darkred hover:to-accent-red"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Criando conta...
                        </>
                      ) : (
                        'Criar conta'
                      )}
                    </Button>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <p className="text-sm text-center text-cinema-600 dark:text-cinema-300">
                    Já tem uma conta?{' '}
                    <Link to="/login" className="text-accent-red hover:underline">
                      Entrar
                    </Link>
                  </p>
                </CardFooter>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants} className="lg:block">
              <div className="space-y-6">
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="https://source.unsplash.com/collection/1424240/600x800" 
                    alt="Cinema experience" 
                    className="w-full h-64 object-cover"
                  />
                </div>
                
                <Newsletter />
                
                <div className="bg-cinema-50 dark:bg-cinema-800/30 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-cinema-900 dark:text-white mb-3">
                    Seus benefícios
                  </h3>
                  <ul className="space-y-2 text-cinema-600 dark:text-cinema-300">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-accent-red flex-shrink-0 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Acesso a promoções exclusivas</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-accent-red flex-shrink-0 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Histórico completo de pedidos</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-accent-red flex-shrink-0 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Programa de pontos e recompensas</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-accent-red flex-shrink-0 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Acesso antecipado a pré-estreias</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
};

export default Register;

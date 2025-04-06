
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Loader2, Save, User, CreditCard, Lock, Trophy } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [isUpdating, setIsUpdating] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
  });

  // Redirecionamento se não estiver autenticado
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Se ainda não tiver dados do usuário ou estiver verificando autenticação, mostra loading
  if (!user) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-accent-red" />
        </div>
        <Footer />
      </>
    );
  }

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    // Simulando uma requisição de atualização
    setTimeout(() => {
      setIsUpdating(false);
      toast({
        title: 'Perfil atualizado',
        description: 'Suas informações foram atualizadas com sucesso.',
      });
    }, 1000);
  };

  const getMembershipInfo = (level: string) => {
    switch (level) {
      case 'bronze':
        return {
          color: 'bg-amber-600',
          nextLevel: 'Prata',
          pointsToNext: 500,
          progress: (user.points / 500) * 100,
          benefits: ['Desconto de 5% em ingressos', 'Acesso a ofertas exclusivas']
        };
      case 'silver':
        return {
          color: 'bg-gray-400',
          nextLevel: 'Ouro',
          pointsToNext: 1000,
          progress: (user.points / 1000) * 100,
          benefits: ['Desconto de 10% em ingressos', 'Pipoca pequena grátis 1x/mês', 'Acesso a pré-vendas']
        };
      case 'gold':
        return {
          color: 'bg-yellow-500',
          nextLevel: 'VIP',
          pointsToNext: 2000,
          progress: (user.points / 2000) * 100,
          benefits: ['Desconto de 15% em ingressos', 'Pipoca média grátis 2x/mês', 'Upgrade de assento quando disponível']
        };
      case 'vip':
        return {
          color: 'bg-purple-600',
          nextLevel: 'Máximo',
          pointsToNext: 0,
          progress: 100,
          benefits: ['Desconto de 20% em ingressos', 'Combo (pipoca+bebida) grátis 1x/semana', 'Ingressos exclusivos para pré-estreias']
        };
      default:
        return {
          color: 'bg-amber-600',
          nextLevel: 'Prata',
          pointsToNext: 500,
          progress: 0,
          benefits: ['Desconto de 5% em ingressos']
        };
    }
  };

  const membershipInfo = getMembershipInfo(user.membershipLevel);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-16 px-4 md:px-6 bg-gray-50 dark:bg-cinema-950">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div className="flex items-center mb-4 md:mb-0">
                <Avatar className="h-16 w-16 mr-4 border-2 border-accent-red">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback className="text-lg">
                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-cinema-900 dark:text-white">
                    {user.name}
                  </h1>
                  <div className="flex items-center mt-1">
                    <Badge className={`${membershipInfo.color} text-white border-0`}>
                      Membro {user.membershipLevel.charAt(0).toUpperCase() + user.membershipLevel.slice(1)}
                    </Badge>
                    <span className="ml-2 text-sm text-cinema-600 dark:text-cinema-300">
                      {user.points} pontos
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="profile" className="flex items-center">
                  <User className="h-4 w-4 mr-2" /> Perfil
                </TabsTrigger>
                <TabsTrigger value="membership" className="flex items-center">
                  <Trophy className="h-4 w-4 mr-2" /> Assinatura
                </TabsTrigger>
                <TabsTrigger value="payment" className="flex items-center">
                  <CreditCard className="h-4 w-4 mr-2" /> Pagamento
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center">
                  <Lock className="h-4 w-4 mr-2" /> Segurança
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações Pessoais</CardTitle>
                    <CardDescription>
                      Atualize suas informações de perfil
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nome completo</Label>
                          <Input
                            id="name"
                            value={profileForm.name}
                            onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={profileForm.email}
                            onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Telefone</Label>
                          <Input
                            id="phone"
                            value={profileForm.phone}
                            onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                            placeholder="(00) 00000-0000"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Endereço</Label>
                          <Input
                            id="address"
                            value={profileForm.address}
                            onChange={(e) => setProfileForm(prev => ({ ...prev, address: e.target.value }))}
                            placeholder="Seu endereço completo"
                          />
                        </div>
                      </div>
                      
                      <Button
                        type="submit"
                        disabled={isUpdating}
                        className="bg-accent-red hover:bg-accent-red/90"
                      >
                        {isUpdating ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Salvando...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Salvar alterações
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="membership">
                <Card>
                  <CardHeader>
                    <CardTitle>Status da assinatura</CardTitle>
                    <CardDescription>
                      Seu nível atual e benefícios
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex flex-col space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Badge className={`${membershipInfo.color} text-white border-0 mr-2`}>
                              {user.membershipLevel.charAt(0).toUpperCase() + user.membershipLevel.slice(1)}
                            </Badge>
                            <span className="text-sm text-cinema-600 dark:text-cinema-300">
                              {user.points} pontos
                            </span>
                          </div>
                          {user.membershipLevel !== 'vip' && (
                            <span className="text-sm font-medium">
                              Próximo nível: {membershipInfo.nextLevel} 
                              ({membershipInfo.pointsToNext - user.points} pontos restantes)
                            </span>
                          )}
                        </div>
                        {user.membershipLevel !== 'vip' && (
                          <div className="w-full">
                            <Progress value={membershipInfo.progress} className="h-2" />
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-3">Seus benefícios:</h3>
                        <ul className="space-y-2">
                          {membershipInfo.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-center">
                              <div className="h-2 w-2 rounded-full bg-accent-red mr-2"></div>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-gray-100 dark:bg-cinema-900 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Como ganhar mais pontos?</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Compre ingressos (10 pontos por ingresso)</li>
                          <li>• Adicione alimentos e bebidas (5 pontos por item)</li>
                          <li>• Avalie filmes após assistir (15 pontos por avaliação)</li>
                          <li>• Traga amigos usando seu código de indicação (50 pontos por amigo)</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="payment">
                <Card>
                  <CardHeader>
                    <CardTitle>Métodos de pagamento</CardTitle>
                    <CardDescription>
                      Gerencie seus cartões e métodos de pagamento
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <p className="mb-4 text-cinema-600 dark:text-cinema-300">
                        Nenhum método de pagamento cadastrado ainda
                      </p>
                      <Button className="bg-accent-red hover:bg-accent-red/90">
                        Adicionar forma de pagamento
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Segurança da conta</CardTitle>
                    <CardDescription>
                      Atualize sua senha e configurações de segurança
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Senha atual</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">Nova senha</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirmar nova senha</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                      <Button className="bg-accent-red hover:bg-accent-red/90">
                        Atualizar senha
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Profile;

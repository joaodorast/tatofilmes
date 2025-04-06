
import { User, RegisteredUser } from "@/types/auth";
import { toast } from '@/hooks/use-toast';
import { sendEmail, subscribeToNewsletter } from '@/utils/emailService';

// Storage keys
export const REGISTERED_USERS_KEY = 'cinema_registered_users';
export const CURRENT_USER_KEY = 'cinema_user';

// Mock user data for initial load
const mockUsers: RegisteredUser[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@exemplo.com',
    password: 'senha123',
    avatarUrl: 'https://source.unsplash.com/150x150/?portrait,man',
    role: 'user',
    membershipLevel: 'gold',
    points: 850
  },
  {
    id: '2',
    name: 'Maria Souza',
    email: 'maria@exemplo.com',
    password: 'senha123',
    avatarUrl: 'https://source.unsplash.com/150x150/?portrait,woman',
    role: 'admin',
    membershipLevel: 'vip',
    points: 1500
  }
];

// Load registered users from localStorage or initialize with mock data
export const loadRegisteredUsers = (): RegisteredUser[] => {
  const storedUsers = localStorage.getItem(REGISTERED_USERS_KEY);
  
  if (storedUsers) {
    try {
      return JSON.parse(storedUsers);
    } catch (error) {
      console.error('Erro ao carregar usuários registrados:', error);
      return initializeUsers();
    }
  } else {
    return initializeUsers();
  }
};

// Initialize users with mock data
export const initializeUsers = (): RegisteredUser[] => {
  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(mockUsers));
  return mockUsers;
};

// Save registered users to localStorage
export const saveRegisteredUsers = (users: RegisteredUser[]): void => {
  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
};

// Get current user from localStorage
export const getCurrentUser = (): User | null => {
  const storedUser = localStorage.getItem(CURRENT_USER_KEY);
  if (storedUser) {
    try {
      return JSON.parse(storedUser);
    } catch (error) {
      console.error('Erro ao analisar o usuário armazenado:', error);
      return null;
    }
  }
  return null;
};

// Save current user to localStorage
export const saveCurrentUser = (user: User): void => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

// Remove current user from localStorage
export const removeCurrentUser = (): void => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

// Login user
export const loginUser = async (
  email: string, 
  password: string, 
  registeredUsers: RegisteredUser[]
): Promise<User> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const foundUser = registeredUsers.find(
    u => u.email === email && u.password === password
  );
  
  if (foundUser) {
    const { password: _, ...userWithoutPassword } = foundUser;
    saveCurrentUser(userWithoutPassword);
    
    toast({
      title: 'Login realizado com sucesso',
      description: `Bem-vindo de volta, ${userWithoutPassword.name}!`,
    });
    
    return userWithoutPassword;
  } else {
    toast({
      title: 'Erro ao fazer login',
      description: 'Email ou senha incorretos. Tente novamente.',
      variant: 'destructive',
    });
    throw new Error('Credenciais inválidas');
  }
};

// Register new user
export const registerUser = async (
  name: string, 
  email: string, 
  password: string, 
  registeredUsers: RegisteredUser[]
): Promise<User> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const userExists = registeredUsers.some(u => u.email === email);
  
  if (userExists) {
    toast({
      title: 'Erro ao criar conta',
      description: 'Este email já está em uso. Tente outro email.',
      variant: 'destructive',
    });
    throw new Error('Email já em uso');
  }
  
  // Create new user
  const newRegisteredUser: RegisteredUser = {
    id: `${Date.now()}`,
    name,
    email,
    password,
    avatarUrl: `https://source.unsplash.com/collection/4389215/150x150?sig=${Date.now()}`,
    role: 'user',
    membershipLevel: 'bronze',
    points: 100
  };
  
  const { password: _, ...newUser } = newRegisteredUser;
  
  // Update storage
  const updatedUsers = [...registeredUsers, newRegisteredUser];
  saveRegisteredUsers(updatedUsers);
  saveCurrentUser(newUser);
  
  toast({
    title: 'Conta criada com sucesso!',
    description: 'Bem-vindo ao Cinema Universe.',
  });

  // Send welcome email and subscribe to newsletter
  try {
    await sendEmail({
      to: email,
      subject: 'Bem-vindo ao Cinema Universe',
      template: 'welcome',
      data: { name }
    });
    
    await subscribeToNewsletter(email, name);
    
    toast({
      title: 'Email enviado!',
      description: 'Enviamos um email de boas-vindas para você.',
    });
  } catch (error) {
    console.error('Erro ao enviar email de boas-vindas:', error);
    // Don't fail registration if email sending fails
  }
  
  return newUser;
};

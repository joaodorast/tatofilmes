
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '@/types/auth';
import { 
  loadRegisteredUsers, 
  getCurrentUser, 
  loginUser, 
  registerUser, 
  removeCurrentUser, 
  saveRegisteredUsers
} from '@/services/authService';
import { toast } from '@/hooks/use-toast';

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [registeredUsers, setRegisteredUsers] = useState(loadRegisteredUsers());
  
  // Check if user is already logged in
  useEffect(() => {
    const storedUser = getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const authenticatedUser = await loginUser(email, password, registeredUsers);
      setUser(authenticatedUser);
    } catch (error) {
      // Error toast is already shown in the service
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const newUser = await registerUser(name, email, password, registeredUsers);
      setUser(newUser);
      // Update registered users state
      setRegisteredUsers(prev => [...prev, { ...newUser, password }]);
    } catch (error) {
      // Error toast is already shown in the service
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    removeCurrentUser();
    toast({
      title: 'Logout realizado',
      description: 'Você foi desconectado com sucesso.',
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register, 
      logout, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}

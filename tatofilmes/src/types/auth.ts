
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: 'user' | 'admin';
  membershipLevel: 'bronze' | 'silver' | 'gold' | 'vip';
  points: number;
}

export interface RegisteredUser extends User {
  password: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

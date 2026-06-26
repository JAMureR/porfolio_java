
import { User, Role } from '../types';

const TOKEN_KEY = 'gtp_token';
const USER_KEY = 'gtp_user';

export const authService = {
  login: async (email: string, password: string): Promise<{user: User, token: string}> => {
    // Simulación de delay de red para práctica de Spring Boot
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Usuario mock
    const user: User = {
      id: '1',
      name: 'Usuario Pro',
      email: email,
      role: 'ADMIN',
      avatarUrl: 'https://picsum.photos/seed/user1/200',
      createdAt: new Date().toISOString()
    };
    const token = 'fake-jwt-token-for-' + email;
    
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    
    return { user, token };
  },

  register: async (name: string, email: string, password: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Usuario registrado:', { name, email });
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  },

  getToken: () => localStorage.getItem(TOKEN_KEY),
  
  getUser: (): User | null => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => !!localStorage.getItem(TOKEN_KEY)
};

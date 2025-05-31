import { jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface DecodedToken {
  sub: string;
  name: string;
  email: string;
  role: string;
  exp: number;
}

const AUTH_TOKEN_KEY = 'fleetpro_auth_token';

// Mock API with fake delays
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const auth = {
  login: async (email: string, password: string): Promise<{ token: string; user: User }> => {
    await delay(800);
    
    // This is a mock implementation
    if (email && password) {
      // In a real app, this would verify credentials with a backend API
      // Here we just create a mock token for demo purposes
      
      // Check for our demo user
      if (email === 'admin@fleetpro.com' && password === 'password123') {
        const user: User = {
          id: '1',
          name: 'Admin User',
          email: 'admin@fleetpro.com',
          role: 'administrator'
        };
        
        // Create a mock JWT that would normally come from the server
        // In production, this would be created and signed on the backend
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6IkFkbWluIFVzZXIiLCJlbWFpbCI6ImFkbWluQGZsZWV0cHJvLmNvbSIsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiZXhwIjoxNzA5MjA4MDAwfQ.mock-signature';
        
        localStorage.setItem(AUTH_TOKEN_KEY, token);
        
        return { token, user };
      }
      
      throw new Error('Invalid credentials');
    }
    
    throw new Error('Email and password are required');
  },

  register: async (userData: { name: string; email: string; password: string }): Promise<{ success: boolean }> => {
    await delay(1000);
    
    // This is a mock implementation
    // In a real app, this would register the user with a backend API
    if (userData.name && userData.email && userData.password) {
      // For demo purposes, we'll just return success
      return { success: true };
    }
    
    throw new Error('Name, email, and password are required');
  },

  logout: (): void => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  },

  getCurrentUser: (): User | null => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    
    if (!token) {
      return null;
    }
    
    try {
      // In a real app, we would verify the token with the backend
      // Here we just decode it to get the user information
      const decoded = jwtDecode<DecodedToken>(token);
      
      // Check if token is expired
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        return null;
      }
      
      return {
        id: decoded.sub,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role
      };
    } catch (error) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      return null;
    }
  },

  isAuthenticated: (): boolean => {
    return auth.getCurrentUser() !== null;
  },

  hasRole: (role: string | string[]): boolean => {
    const user = auth.getCurrentUser();
    if (!user) return false;
    
    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    
    return user.role === role;
  },

  resetPassword: async (email: string): Promise<{ success: boolean }> => {
    await delay(800);
    
    // In a real app, this would send a password reset email
    // Here we just return success if an email is provided
    if (email) {
      return { success: true };
    }
    
    throw new Error('Email is required');
  },

  changePassword: async (currentPassword: string, newPassword: string): Promise<{ success: boolean }> => {
    await delay(1000);
    
    // In a real app, this would verify the current password and update to the new password
    // Here we just return success if both passwords are provided
    if (currentPassword && newPassword) {
      return { success: true };
    }
    
    throw new Error('Current password and new password are required');
  }
};

export default auth;
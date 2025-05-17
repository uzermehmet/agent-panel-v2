import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Types
interface User {
  id: string;
  name: string;
  email: string;
  role: 'agency_manager' | 'expert_user' | 'standard_user';
  permissions: string[];
  assignedCountries?: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create provider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Check for existing session on startup
  useEffect(() => {
    const checkSession = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        
        if (token) {
          // In a real app, validate the token with backend
          // For now, use mock data
          const userData: User = {
            id: '1',
            name: 'Ali Yılmaz',
            email: 'ali@acenta.com',
            role: 'agency_manager',
            permissions: ['manage_all', 'manage_staff', 'manage_applications', 'view_reports'],
            assignedCountries: ['US', 'FR', 'GR', 'IT', 'HU']
          };
          setUser(userData);
        }
      } catch (error) {
        console.error('Session validation error:', error);
        localStorage.removeItem('auth_token');
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  // Get permissions based on role
  const getRolePermissions = (role: string): string[] => {
    switch (role) {
      case 'agency_manager':
        return ['manage_all', 'manage_staff', 'manage_applications', 'view_reports'];
      case 'expert_user':
        return ['manage_applications', 'view_reports'];
      case 'standard_user':
        return ['view_applications'];
      default:
        return [];
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock successful login
      if (email && password) {
        const userData: User = {
          id: '1',
          name: 'Ali Yılmaz',
          email: email,
          role: 'agency_manager',
          permissions: getRolePermissions('agency_manager'),
          assignedCountries: ['US', 'FR', 'GR', 'IT', 'HU']
        };
        
        localStorage.setItem('auth_token', 'mock_jwt_token');
        setUser(userData);
        navigate('/dashboard');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    navigate('/login');
  };

  // Check if user has specific permission
  const hasPermission = (permission: string) => {
    if (!user) return false;
    return user.permissions.includes(permission) || user.role === 'agency_manager';
  };

  const contextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    hasPermission
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

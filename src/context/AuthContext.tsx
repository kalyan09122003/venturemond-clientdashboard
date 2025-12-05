import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, login as authLogin, signup as authSignup, logout as authLogout, getCurrentUser } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    // We can't use useNavigate here directly if AuthProvider is wrapping BrowserRouter.
    // We'll rely on the caller to handle navigation or move Router inside.
    // Ideally, AuthProvider is inside Router.

    useEffect(() => {
        const initAuth = () => {
            const storedUser = getCurrentUser();
            if (storedUser) {
                setUser(storedUser);
                setIsAuthenticated(true);
            }
            setIsLoading(false);
        };
        initAuth();
    }, []);

    const login = async (email: string, password: string) => {
        const userData = await authLogin(email, password);
        setUser(userData);
        setIsAuthenticated(true);
    };

    const signup = async (name: string, email: string, password: string) => {
        const userData = await authSignup(name, email, password);
        setUser(userData);
        setIsAuthenticated(true);
    };

    const logout = () => {
        authLogout();
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
    id: string;
    email: string;
    name: string;
    onboardingComplete: boolean;
    financialProfile?: {
        age: string;
        occupation: string;
        location: string;
        income: string;
        expenses: string;
        savings: string;
        investments: string[];
        goals: {
            type: string[];
            targetAmount: string;
            timeline: string;
        };
        personality: string;
        healthScore: number;
    };
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (data: any) => Promise<void>;
    logout: () => void;
    updateOnboarding: (data: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load user from localStorage on mount
        const savedUser = localStorage.getItem('kuberx_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        // Mock login logic
        const mockUser: User = {
            id: '1',
            email,
            name: 'User',
            onboardingComplete: true, // Defaulting to true for returning users
        };
        setUser(mockUser);
        localStorage.setItem('kuberx_user', JSON.stringify(mockUser));
    };

    const signup = async (data: any) => {
        const newUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            email: data.email,
            name: data.name,
            onboardingComplete: false,
        };
        setUser(newUser);
        localStorage.setItem('kuberx_user', JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('kuberx_user');
    };

    const updateOnboarding = async (data: any) => {
        if (!user) return;
        const updatedUser = { ...user, onboardingComplete: true, financialProfile: data };
        setUser(updatedUser);
        localStorage.setItem('kuberx_user', JSON.stringify(updatedUser));
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout, updateOnboarding }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

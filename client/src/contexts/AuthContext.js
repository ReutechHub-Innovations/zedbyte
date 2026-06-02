import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const token = localStorage.getItem('zedbytes-token');
                if (token) {
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    const response = await api.get('/auth/me');
                    setUser(response.data.user);
                }
            } catch (error) {
                console.error('Failed to fetch user', error);
                localStorage.removeItem('zedbytes-token');
                delete api.defaults.headers.common['Authorization'];
            } finally {
                setLoading(false);
            }
        };

        checkUser();
    }, []);

    const login = async (credentials) => {
        const response = await api.post('/auth/login', credentials);
        const { token, user } = response.data;
        
        // Store token
        localStorage.setItem('zedbytes-token', token);
        
        // Set default header for future requests
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        setUser(user);
        return user;
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            console.error('Logout error:', error);
        }
        
        // Clear local state and token
        localStorage.removeItem('zedbytes-token');
        delete api.defaults.headers.common['Authorization'];
        setUser(null);
        window.location.href = '/';
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://54.179.0.116:8000/api/user', {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(response => {
                setUser(response.data);
                setLoading(false);
            })
            .catch(() => {
                localStorage.removeItem('token');
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        const response = await axios.post('http://localhost:8000/api/login', { email, password });
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
        return response.data.user;
    };

    const logout = async () => {
        await axios.post('http://localhost:8000/api/logout', {}, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Se corrige para usar VITE_API_URL (el nombre que usaste en Render) 
  // y se elimina el fallback de localhost para forzar el uso de la variable.
  const API_URL = process.env.VITE_API_URL; 

  // Si la URL es undefined (falló la inyección), detenemos la app.
  if (!API_URL && !loading) {
      console.error("CRITICAL ERROR: API_URL is not defined. Check Render environment variables.");
      // Renderiza un error o un mensaje de carga infinita si no hay API_URL
  }
    
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const value = {
    user,
    loading,
    signIn: async (email, password) => {
      // Usamos la API_URL correcta inyectada por Render
      const response = await fetch(`${API_URL}/api/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
      }
      return data;
    },
    signUp: async (email, password, username) => {
      // Usamos la API_URL correcta inyectada por Render
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, username })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
      }
      return data;
    },
    signOut: () => {
      localStorage.removeItem('user');
      setUser(null);
      navigate('/signin');
    },
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
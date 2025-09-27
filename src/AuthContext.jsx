import React, { createContext, useContext, useState } from 'react';

const AuthCtx = createContext(null);
const API_URL = import.meta.env.VITE_API_URL;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);

  const saveSession = (u, t) => {
    setUser(u);
    setToken(t);
    localStorage.setItem('user', JSON.stringify(u));
    localStorage.setItem('token', t);
  };

  const clearSession = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const signUp = async (email, password, username) => {
    const res = await fetch(`${API_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, username })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error en registro');
    saveSession(data.user, data.token);
    return { ok: true };
  };

  const signIn = async (email, password) => {
    const res = await fetch(`${API_URL}/api/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error en acceso');
    saveSession(data.user, data.token);
    return { ok: true };
  };

  const signOut = () => clearSession();

  const authFetch = async (url, options = {}) => {
    const headers = new Headers(options.headers || {});
    if (token) headers.set('Authorization', `Bearer ${token}`);
    const res = await fetch(url, { ...options, headers });
    return res;
  };

  return (
    <AuthCtx.Provider value={{ user, token, signUp, signIn, signOut, authFetch }}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);

import React, { createContext, useContext, useState, useEffect } from "react";

// Contexto
const AuthContext = createContext(null);

// Hook para usar el contexto
export const useAuth = () => useContext(AuthContext);

// Proveedor de autenticación
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // URL de backend desde las variables de entorno
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error("❌ Error leyendo localStorage:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Función de login
  const signIn = async (username, password) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error("Credenciales inválidas");
      }

      const data = await res.json();
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      return data;
    } catch (err) {
      console.error("❌ Error al iniciar sesión:", err);
      throw err;
    }
  };

  // Función de logout
  const signOut = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const value = {
    user,
    loading,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

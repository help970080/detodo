import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx";

export default function ProfilePage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // Si no hay usuario autenticado → redirige a login
  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user, navigate]);

  if (!user) {
    return null; // evita parpadeo mientras redirige
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Mi Perfil
        </h1>
        <div className="space-y-4">
          <p>
            <span className="font-semibold">Usuario:</span> {user.username}
          </p>
          {user.email && (
            <p>
              <span className="font-semibold">Correo:</span> {user.email}
            </p>
          )}
          <p>
            <span className="font-semibold">Rol:</span>{" "}
            {user.role || "usuario"}
          </p>
        </div>
        <button
          onClick={signOut}
          className="mt-6 w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

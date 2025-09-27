import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-white shadow-md px-4 py-3 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent">
          DE TODO UN POCO
        </span>
      </Link>

      {/* Menú derecho */}
      <div className="flex items-center gap-4">
        <Link to="/search" className="text-gray-700 hover:text-blue-600">
          Buscar
        </Link>
        {user ? (
          <>
            <Link to="/profile" className="text-gray-700 hover:text-blue-600">
              Perfil
            </Link>
            <button
              onClick={signOut}
              className="text-red-600 hover:underline"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link to="/signin" className="text-gray-700 hover:text-blue-600">
            Iniciar sesión
          </Link>
        )}
      </div>
    </nav>
  );
}

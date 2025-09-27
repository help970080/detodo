import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

export default function ProfilePage() {
  const { user, authFetch } = useAuth();
  const [profile, setProfile] = useState(null);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate('/signin');
    (async () => {
      const u = await fetch(`${API_URL}/api/users/${user.uid}`).then(r => r.json());
      setProfile(u);
      const ps = await fetch(`${API_URL}/api/products/by-user/${user.uid}`).then(r => r.json());
      setProducts(ps);
    })();
  }, [user]);

  const markSold = async (id) => {
    const r = await authFetch(`${API_URL}/api/products/sold/${id}`, { method: 'PUT' });
    if (r.ok) setProducts(prev => prev.map(p => p._id === id ? { ...p, status: 'vendido' } : p));
  };

  const remove = async (id) => {
    const r = await authFetch(`${API_URL}/api/products/${id}`, { method: 'DELETE' });
    if (r.ok) setProducts(prev => prev.filter(p => p._id !== id));
  };

  return (
    <motion.div className="container mx-auto px-4 py-8 pt-20 md:pt-8" initial={{opacity:0}} animate={{opacity:1}}>
      <h2 className="text-3xl font-bold mb-6">Mi Perfil</h2>
      {profile && (
        <div className="bg-white rounded-3xl shadow p-6 mb-6">
          <div className="text-xl font-semibold">{profile.username}</div>
          <div className="text-gray-600">{profile.email}</div>
          <div className="mt-2">{profile.hasActiveSubscription ? 'Suscripción activa' : 'Sin suscripción'}</div>
        </div>
      )}

      <h3 className="text-2xl font-bold mb-4">Mis productos</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(p => (
          <div key={p._id} className="relative">
            <ProductCard product={p} />
            <div className="flex gap-2 absolute top-3 right-3">
              {p.status !== 'vendido' && (
                <button onClick={() => markSold(p._id)} className="px-3 py-1 text-xs bg-green-600 text-white rounded">Vendido</button>
              )}
              <button onClick={() => remove(p._id)} className="px-3 py-1 text-xs bg-red-600 text-white rounded">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

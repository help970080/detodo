import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';

const API_URL = import.meta.env.VITE_API_URL;

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/api/products`);
        if (!res.ok) throw new Error('No se pudieron cargar los productos');
        const data = await res.json();
        setProducts(data);
      } catch (e) {
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="p-10 text-center">Cargando...</div>;
  if (err) return <div className="p-10 text-center text-red-600">{err}</div>;

  return (
    <motion.div className="container mx-auto px-4 py-8 md:pt-8" initial={{opacity:0}} animate={{opacity:1}}>
      <h2 className="text-3xl font-bold mb-6">Lo más nuevo</h2>
      {products.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(p => <ProductCard key={p._id} product={p} />)}
        </div>
      ) : (
        <p>No hay productos aún.</p>
      )}
    </motion.div>
  );
}

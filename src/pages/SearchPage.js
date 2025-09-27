import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

const API_URL = import.meta.env.VITE_API_URL;

export default function SearchPage() {
  const [q, setQ] = useState('');
  const [list, setList] = useState([]);

  const search = async (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q) params.append('name', q);
    const res = await fetch(`${API_URL}/api/products?${params.toString()}`);
    const data = await res.json();
    setList(data);
  };

  useEffect(() => { /* opcional: carga inicial */ }, []);

  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <form onSubmit={search} className="mb-6 flex gap-2">
        <input value={q} onChange={(e)=>setQ(e.target.value)} className="flex-1 border rounded-lg p-2" placeholder="Buscar..." />
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Buscar</button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {list.map(p => <ProductCard key={p._id} product={p} />)}
      </div>
    </div>
  );
}

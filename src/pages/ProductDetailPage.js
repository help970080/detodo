import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../AuthContext';

const API_URL = import.meta.env.VITE_API_URL;

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, authFetch } = useAuth();
  const [product, setProduct] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const r1 = await fetch(`${API_URL}/api/products/${id}`);
        if (!r1.ok) throw new Error('Producto no encontrado');
        const p = await r1.json();
        setProduct(p);

        const r2 = await fetch(`${API_URL}/api/messages/by-product/${id}`);
        const ms = await r2.json();
        setMessages(ms);
      } catch (e) {
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const markSold = async () => {
    if (!user) return alert('Inicia sesión');
    const r = await authFetch(`${API_URL}/api/products/sold/${id}`, { method: 'PUT' });
    const d = await r.json();
    if (!r.ok) return alert(d.message || 'Error');
    alert('Producto vendido');
    navigate('/');
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!user || !text.trim()) return;
    const r = await authFetch(`${API_URL}/api/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: id, message: text })
    });
    if (r.ok) {
      setMessages([...messages, { _id: Date.now().toString(), productId: id, senderId: user.uid, senderUsername: user.username, message: text, createdAt: new Date() }]);
      setText('');
    } else {
      const d = await r.json();
      alert(d.message || 'Error al enviar');
    }
  };

  if (loading) return <div className="p-10 text-center">Cargando...</div>;
  if (err) return <div className="p-10 text-center text-red-600">{err}</div>;
  if (!product) return null;

  return (
    <motion.div className="container mx-auto px-4 py-8 pt-20 md:pt-8" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      <p className="mb-4">{product.description}</p>
      {!!product.images?.length && (
        <img src={product.images[0]} className="w-full max-w-xl rounded-lg mb-4" />
      )}
      <div className="mb-4 font-semibold">Precio: {product.price} {product.currency || 'MXN'}</div>

      {user && user.uid === product.seller_id && product.status !== 'vendido' && (
        <button onClick={markSold} className="px-4 py-2 bg-green-600 text-white rounded-lg">Marcar vendido</button>
      )}

      <hr className="my-6" />
      <h3 className="text-2xl font-bold mb-2">Preguntas</h3>
      <form onSubmit={sendMessage} className="flex gap-2 mb-4">
        <input value={text} onChange={(e)=>setText(e.target.value)} className="flex-1 border rounded-lg p-2" placeholder="Escribe tu pregunta..." />
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Enviar</button>
      </form>
      <div className="space-y-2">
        {messages.map(m => (
          <div key={m._id} className="bg-gray-100 rounded-lg p-3">
            <div className="text-sm text-gray-600">{m.senderUsername}</div>
            <div>{m.message}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import AddProductPage from './pages/AddProductPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import SignInPage from './pages/SignInPage.jsx';
import SubscribePage from './pages/SubscribePage.jsx';
import { AuthProvider } from './AuthContext';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pb-20 md:pb-0">
          <Navbar />
          <main className="pt-20">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/add-product" element={<AddProductPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/subscribe" element={<SubscribePage />} />
              <Route
                path="/menu"
                element={
                  <div className="text-center py-20">
                    <h2 className="text-3xl font-bold text-gray-800">Menú de opciones</h2>
                    <p className="text-gray-600 mt-4">Más funcionalidades pronto.</p>
                  </div>
                }
              />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

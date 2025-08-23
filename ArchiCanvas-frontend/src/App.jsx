import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import CommunityPage from './pages/CommunityPage';
import News from './pages/News.jsx';
import Explore from './pages/Explore'
import ProductDetail from './pages/ProductDetail'
import Community from './pages/Community'
import Learn from './pages/Learn'
import About from './pages/About'
import Profile from './pages/Profile'
import SellerDashboard from './pages/SellerDashboard'
import AdminDashboard from './pages/AdminDashboard'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import Shop from './pages/shop';
import ViewPost from './pages/viewpost.jsx';
import ArchiChat from './components/ArchiChat.jsx';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-base-100">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="news" element={<News />} />
              <Route path="explore" element={<Explore />} />
              <Route path="product/:id" element={<ProductDetail />} />
              <Route path="community" element={<Community />} />
              <Route path="community/:id" element={<CommunityPage />} />
              <Route path="shop" element={<Shop />} />
              <Route path="learn" element={<Learn />} />
              <Route path="about" element={<About />} />
              <Route path="profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="seller-dashboard" element={
                <ProtectedRoute requiredRole="seller">
                  <SellerDashboard />
                </ProtectedRoute>
              } />
              <Route path="admin-dashboard" element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="posts/:id" element={<ViewPost />} />
              <Route path="ai-chat" element={<ArchiChat />} />
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App

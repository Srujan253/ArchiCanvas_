import React from 'react';

import { useState  } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'
import uploadproduct from "../UploadProduct"

import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Home, 
  Search, 
  Users, 
  BookOpen, 
  Info, 
  User,
  Settings,
  LogOut,
  ChevronDown,
  Plus,
  ShoppingBag,
  Newspaper,
  Bot
} from 'lucide-react'
import PostCreator from '../PostCreator';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const { user, logout, isAuthenticated } = useAuth()
  const [showPostModal, setShowPostModal] = useState(false);
  const [showUploadProductModal, setShowUploadProductModal] = useState(false);
  const { isDark, toggleTheme } = useTheme()
  const location = useLocation()

  const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Latest News', href: '/news', icon: Newspaper },
  { name: 'Explore', href: '/explore', icon: Search },
  { name: 'Community', href: '/community', icon: Users },
  { name: 'Shop', href: '/shop', icon: ShoppingBag },
  // { name: 'Learn', href: '/learn', icon: BookOpen },
  { name: 'About', href: '/about', icon: Info },
  { name: 'ArchiChat', href: '/ai-chat', icon: Bot },
  ]

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    logout()
    setIsProfileOpen(false)
  }

  return (
    <nav className="bg-base-100 border-b border-base-300 sticky top-0 z-50">
      <div className="w-full px-0">
        <div className="flex items-center h-16 w-full">
          {/* Logo - absolute far left, navbar full width */}
          <div className="flex-shrink-0 pl-6 pr-10">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-2xl font-serif font-bold text-gradient">ArchiCanvas</span>
            </Link>
          </div>

          {/* Desktop Navigation - centered and spaced */}
          <div className="hidden md:flex flex-1 justify-center items-center space-x-8">
            {navigation.slice(0,2).map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/20'
                    : 'text-base-content hover:text-primary-600 hover:bg-base-200'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}

           

            {navigation.slice(2).map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/20'
                    : 'text-base-content hover:text-primary-600 hover:bg-base-200'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
           {/* Post Button for Artists (styled like nav item) */}
           {/* {isAuthenticated && user.role === 'artist' && (
              <>
                <button
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors text-base-content hover:text-primary-600 hover:bg-base-200`}
                  style={{ marginLeft: 0, marginRight: 0 }}
                  onClick={() => setShowPostModal(true)}
                  aria-label="Create Post"
                >
                  <Plus className="w-4 h-4" />
                  <span>Post</span>
                </button>
                <button
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors text-base-content hover:text-primary-600 hover:bg-base-200`}
                  style={{ marginLeft: 0, marginRight: 0 }}
                  onClick={() => setShowUploadProductModal(true)}
                  aria-label="Upload Product"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload Product</span>
                </button>
              </>
            )} */}

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-base-200 hover:bg-base-300 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg bg-base-200 hover:bg-base-300 transition-colors"
                >
                  <img
                    src={
                      user.avatar
                        ? user.avatar
                        : user.role === 'admin'
                          ? 'https://cdn-icons-png.flaticon.com/512/1828/1828640.png' // admin icon
                          : user.role === 'artist'
                            ? 'https://cdn-icons-png.flaticon.com/512/2922/2922510.png' // artist icon
                            : user.role === 'buyer'
                              ? 'https://cdn-icons-png.flaticon.com/512/1077/1077012.png' // buyer icon
                              : 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg'
                    }
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="hidden sm:block text-sm font-medium">{user.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-56 bg-base-100 rounded-lg shadow-lg border border-base-300 py-2 z-50"
                    >
                      <div className="px-4 py-3 border-b border-base-300">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-base-content/70">{user.email}</p>
                        {user.specialization && (
                          <p className="text-xs text-primary-600">{user.specialization}</p>
                        )}
                      </div>
                      

                      <Link
                        to="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center space-x-3 px-4 py-2 text-sm hover:bg-base-200 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </Link>

                      {/* Post and Upload Product for Artists above Dashboard */}
                      {user.role === 'artist' && (
                        <>
                          <button
                            className="flex items-center space-x-3 px-4 py-2 text-sm hover:bg-base-200 transition-colors w-full text-left"
                            onClick={() => {
                              setShowPostModal(true);
                              setIsProfileOpen(false);
                            }}
                          >
                            <Plus className="w-4 h-4" />
                            <span>Post</span>
                          </button>
                          <button
                            className="flex items-center space-x-3 px-4 py-2 text-sm hover:bg-base-200 transition-colors w-full text-left"
                            onClick={() => {
                              setShowUploadProductModal(true);
                              setIsProfileOpen(false);
                            }}
                          >
                            <Plus className="w-4 h-4" />
                            <span>Upload Product</span>
                          </button>
                        </>
                      )}

                      {/* {user.role === 'artist' && (
                        <Link
                          to="/seller-dashboard"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center space-x-3 px-4 py-2 text-sm hover:bg-base-200 transition-colors"
                        >
                          <Settings className="w-4 h-4" />
                          <span>Dashboard</span>
                        </Link>
                      )} */}

                      {user.role === 'admin' && (
                        <Link
                          to="/admin-dashboard"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center space-x-3 px-4 py-2 text-sm hover:bg-base-200 transition-colors"
                        >
                          <Settings className="w-4 h-4" />
                          <span>Admin Panel</span>
                        </Link>
                      )}

                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-2 text-sm hover:bg-base-200 transition-colors w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="btn-outline text-sm px-4 py-2"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-sm px-4 py-2"
                >
                  Join as Artist
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg bg-base-200 hover:bg-base-300 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Post Creator Modal */}
      {isAuthenticated && user.role === 'artist' && (
        <>
          <PostCreator
            open={showPostModal}
            onClose={() => setShowPostModal(false)}
            onSubmit={(postData) => {
              // TODO: Save postData to backend or global state for Explore page
              setShowPostModal(false);
            }}
          />
          {showUploadProductModal && (
            React.createElement(uploadproduct, {
              open: showUploadProductModal,
              onClose: () => setShowUploadProductModal(false)
            })
          )}
        </>
      )}

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-base-300 bg-base-100"
          >
            <div className="px-4 py-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/20'
                      : 'text-base-content hover:text-primary-600 hover:bg-base-200'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar

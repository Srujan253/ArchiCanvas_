import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import { Eye, EyeOff, Mail, Lock, Palette, Building2, Users } from 'lucide-react'
import toast from 'react-hot-toast'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'buyer'
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const roles = [
    { value: 'buyer', label: 'Buyer', icon: Users, description: 'Browse and collect artworks' },
    { value: 'artist', label: 'Artist', icon: Palette, description: 'Sell your creations' },
    { value: 'admin', label: 'Admin', icon: Building2, description: 'Manage platform' }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await login(formData.email, formData.password, formData.role)
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const getDemoCredentials = () => {
    const credentials = {
      buyer: { email: 'collector@archicanvas.com', password: 'password123' },
      artist: { email: 'artist@archicanvas.com', password: 'password123' },
      admin: { email: 'admin@archicanvas.com', password: 'password123' }
    }
    return credentials[formData.role]
  }

  const fillDemoCredentials = () => {
    const creds = getDemoCredentials()
    setFormData(prev => ({
      ...prev,
      email: creds.email,
      password: creds.password
    }))
    toast.success('Demo credentials filled!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">A</span>
            </div>
            <span className="text-3xl font-serif font-bold text-gradient">ArchiCanvas</span>
          </Link>
        </div>

        {/* Login Card */}
        <div className="bg-base-100 rounded-2xl shadow-xl p-8 border border-base-300">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-base-content mb-2">Welcome Back</h1>
            <p className="text-base-content/70">Sign in to your account</p>
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-base-content mb-3">
              I am a...
            </label>
            <div className="grid grid-cols-3 gap-3">
              {roles.map((role) => (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role: role.value }))}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 text-center ${
                    formData.role === role.value
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-base-300 hover:border-primary-300'
                  }`}
                >
                  <role.icon className="w-6 h-6 mx-auto mb-2 text-primary-600" />
                  <div className="text-sm font-medium">{role.label}</div>
                  <div className="text-xs text-base-content/70">{role.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Demo Credentials Button */}
          <div className="mb-6">
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="w-full p-3 text-sm text-primary-600 hover:text-primary-700 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
            >
              Fill Demo Credentials
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-base-content mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/40" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-base-100 text-base-content placeholder-base-content/50"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-base-content mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-base-100 text-base-content placeholder-base-content/50"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/40 hover:text-base-content/60"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="loading loading-spinner loading-sm mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-base-content/70">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">
                Sign up here
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-base-content/70 hover:text-base-content transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default Login

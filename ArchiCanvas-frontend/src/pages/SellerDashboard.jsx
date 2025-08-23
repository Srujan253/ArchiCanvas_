import { motion } from 'framer-motion'
import { Palette, BarChart3, Users, TrendingUp } from 'lucide-react'

const SellerDashboard = () => {
  return (
    <div className="min-h-screen bg-base-100">
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-base-content mb-4">
              Seller Dashboard
            </h1>
            <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
              Track your sales, manage your artworks, and grow your artistic business
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <Palette className="w-24 h-24 text-primary-400 mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-base-content mb-4">
            Seller Dashboard Coming Soon
          </h2>
          <p className="text-base-content/70 max-w-md mx-auto">
            We're building a comprehensive dashboard with analytics, inventory management, and sales tracking.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SellerDashboard

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  ArrowRight, 
  Palette, 
  Building2, 
  Users, 
  Star,
  Heart,
  Eye,
  ShoppingCart
} from 'lucide-react'

const Home = () => {
  // Mock featured artworks data
  const featuredArtworks = [
    {
      id: 1,
      title: "Abstract Harmony",
      artist: "Sarah Artist",
      price: "$2,500",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop",
      category: "Painting",
      rating: 4.8,
      likes: 156,
      views: 1200
    },
    {
      id: 2,
      title: "Modern Architecture",
      artist: "Mike Designer",
      price: "$5,000",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=400&fit=crop",
      category: "Architecture",
      rating: 4.9,
      likes: 203,
      views: 1800
    },
    {
      id: 3,
      title: "Sculptural Dreams",
      artist: "Emma Sculptor",
      price: "$3,800",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
      category: "Sculpture",
      rating: 4.7,
      likes: 134,
      views: 950
    },
    {
      id: 4,
      title: "Digital Art",
      artist: "Alex Digital",
      price: "$1,200",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
      category: "Digital",
      rating: 4.6,
      likes: 98,
      views: 750
    }
  ]

  const stats = [
    { number: "500+", label: "Artists", icon: Palette },
    { number: "2000+", label: "Buyers", icon: Users },
    { number: "100+", label: "Communities", icon: Building2 },
    { number: "50K+", label: "Artworks", icon: Star }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-base-content mb-6"
            >
              Where{' '}
              <span className="text-gradient">Art</span>
              {' '}Meets{' '}
              <span className="text-gradient">Culture</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-base-content/70 max-w-3xl mx-auto mb-8"
            >
              Discover and collect unique artworks and architectural designs from talented artists worldwide. 
              Join our vibrant community of creators and collectors.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/explore" className="btn-primary text-lg px-8 py-4">
                Explore Art
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/community" className="btn-outline text-lg px-8 py-4">
                Join Community
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Floating Elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 right-10 w-20 h-20 bg-primary-200 rounded-full opacity-20 hidden lg:block"
        />
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-20 left-10 w-16 h-16 bg-secondary-200 rounded-full opacity-20 hidden lg:block"
        />
      </section>

      {/* Stats Banner */}
      <section className="py-16 bg-base-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-primary-600" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-base-content mb-2">
                  {stat.number}
                </div>
                <div className="text-base-content/70">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Artworks */}
      <section className="py-20 bg-base-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-base-content mb-4">
              Featured Artworks
            </h2>
            <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
              Discover handpicked masterpieces from our talented community of artists and architects
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {featuredArtworks.map((artwork, index) => (
              <motion.div
                key={artwork.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="bg-base-100 rounded-xl overflow-hidden shadow-lg card-hover"
              >
                <div className="relative group">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute top-4 right-4">
                    <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                      <Heart className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-primary-600 font-medium">
                      {artwork.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{artwork.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-lg text-base-content mb-2">
                    {artwork.title}
                  </h3>
                  
                  <p className="text-sm text-base-content/70 mb-4">
                    by {artwork.artist}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-primary-600">
                      {artwork.price}
                    </span>
                    <div className="flex items-center space-x-4 text-sm text-base-content/70">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{artwork.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{artwork.likes}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Link
                    to={`/product/${artwork.id}`}
                    className="btn-primary w-full flex items-center justify-center"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link to="/explore" className="btn-outline text-lg px-8 py-4">
              View All Artworks
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Ready to Start Your Creative Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of artists and collectors in the world's most vibrant art and architecture marketplace
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-colors">
                Become an Artist
              </Link>
              <Link to="/explore" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-lg transition-colors">
                Start Collecting
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home

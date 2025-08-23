import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Heart, 
  Share2, 
  MessageCircle, 
  Star, 
  Eye, 
  ShoppingCart, 
  DollarSign,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check
} from 'lucide-react'
import toast from 'react-hot-toast'

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [showAI, setShowAI] = useState(false)
  const [aiDescription, setAiDescription] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)

  // Mock product data
  useEffect(() => {
    const mockProduct = {
      id: parseInt(id),
      title: "Abstract Harmony",
      artist: "Sarah Artist",
      price: 2500,
      images: [
        "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop"
      ],
      category: "Painting",
      rating: 4.8,
      likes: 156,
      views: 1200,
      tags: ["Abstract", "Contemporary", "Colorful", "Expressionism"],
      description: "A vibrant abstract painting that explores the harmony between contrasting colors and dynamic brushstrokes. This piece represents the artist's journey through emotional landscapes, where each stroke tells a story of inner discovery and artistic evolution.",
      dimensions: "36\" x 48\"",
      medium: "Acrylic on Canvas",
      year: "2024",
      story: "This artwork was inspired by a transformative period in the artist's life, where she discovered the power of color to express complex emotions. The piece evolved over several months, with each layer representing a different phase of personal growth.",
      reviews: [
        {
          id: 1,
          user: "Art Collector",
          rating: 5,
          comment: "Absolutely stunning piece! The colors are so vibrant and the composition is perfect.",
          date: "2024-01-15"
        },
        {
          id: 2,
          user: "Gallery Owner",
          rating: 4,
          comment: "Beautiful work with great technique. The artist has a unique style.",
          date: "2024-01-10"
        }
      ]
    }
    setProduct(mockProduct)
  }, [id])

  const handleLike = () => {
    setIsLiked(!isLiked)
    toast.success(isLiked ? 'Removed from favorites' : 'Added to favorites')
  }

  const handleShare = async () => {
    try {
      await navigator.share({
        title: product.title,
        text: `Check out this amazing artwork: ${product.title} by ${product.artist}`,
        url: window.location.href
      })
    } catch (error) {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast.success('Link copied to clipboard!')
    }
  }

  const generateAIDescription = async () => {
    setIsGenerating(true)
    // Simulate AI API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const aiText = `"Abstract Harmony" is a masterful exploration of chromatic relationships and emotional depth. The artist employs a sophisticated palette of complementary and analogous colors to create visual tension and resolution. The dynamic brushwork demonstrates advanced technical skill, with each stroke contributing to the overall narrative of balance and contrast. This contemporary abstract piece successfully bridges traditional painting techniques with modern artistic sensibilities, making it a compelling addition to any serious art collection.`
    
    setAiDescription(aiText)
    setShowAI(true)
    setIsGenerating(false)
    toast.success('AI description generated!')
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-100">
      {/* Breadcrumb */}
      <div className="bg-base-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm breadcrumbs">
            <ul>
              <li><a href="/" className="text-base-content/70 hover:text-primary-600">Home</a></li>
              <li><a href="/explore" className="text-base-content/70 hover:text-primary-600">Explore</a></li>
              <li className="text-base-content">{product.title}</li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Main Image */}
              <div className="relative rounded-xl overflow-hidden bg-base-200 mb-4">
                <img
                  src={product.images[selectedImage]}
                  alt={product.title}
                  className="w-full h-96 lg:h-[500px] object-cover"
                />
                
                {/* Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-white/20 text-6xl font-bold select-none">
                    ArchiCanvas
                  </div>
                </div>

                {/* Navigation Arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage(prev => prev === 0 ? product.images.length - 1 : prev - 1)}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                    <button
                      onClick={() => setSelectedImage(prev => prev === product.images.length - 1 ? 0 : prev + 1)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                    >
                      <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="flex space-x-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index 
                          ? 'border-primary-500' 
                          : 'border-base-300 hover:border-primary-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-primary-600 font-medium">
                  {product.category}
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-base-content/70">({product.reviews.length} reviews)</span>
                </div>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-serif font-bold text-base-content mb-2">
                {product.title}
              </h1>
              
              <p className="text-lg text-base-content/70">
                by <span className="text-primary-600 font-medium">{product.artist}</span>
              </p>
            </div>

            {/* Price and Actions */}
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-primary-600">
                ${product.price.toLocaleString()}
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleLike}
                  className={`p-3 rounded-lg transition-colors ${
                    isLiked 
                      ? 'bg-red-100 text-red-600 dark:bg-red-900/20' 
                      : 'bg-base-200 hover:bg-base-300'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                </button>
                
                <button
                  onClick={handleShare}
                  className="p-3 rounded-lg bg-base-200 hover:bg-base-300 transition-colors"
                >
                  {copied ? <Check className="w-5 h-5 text-green-600" /> : <Share2 className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center space-x-6 text-sm text-base-content/70">
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{product.views} views</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4" />
                <span>{product.likes} likes</span>
              </div>
            </div>

            {/* Purchase Button */}
            <button className="btn-primary w-full py-4 text-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Purchase Artwork
            </button>

            {/* Donate Button */}
            <button className="btn-outline w-full py-4 text-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 mr-2" />
              Support Artist
            </button>

            {/* AI Rewrite Feature */}
            <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <div className="flex items-center space-x-2 mb-3">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-purple-700 dark:text-purple-300">AI-Powered Description</span>
              </div>
              
              {!showAI ? (
                <button
                  onClick={generateAIDescription}
                  disabled={isGenerating}
                  className="btn-secondary w-full"
                >
                  {isGenerating ? (
                    <div className="flex items-center justify-center">
                      <div className="loading loading-spinner loading-sm mr-2"></div>
                      Generating AI Description...
                    </div>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Rewrite with AI
                    </>
                  )}
                </button>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-purple-700 dark:text-purple-300 leading-relaxed">
                    {aiDescription}
                  </p>
                  <button
                    onClick={() => setShowAI(false)}
                    className="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                  >
                    Show Original Description
                  </button>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-base-content">Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-base-content/70">Dimensions:</span>
                  <p className="font-medium">{product.dimensions}</p>
                </div>
                <div>
                  <span className="text-base-content/70">Medium:</span>
                  <p className="font-medium">{product.medium}</p>
                </div>
                <div>
                  <span className="text-base-content/70">Year:</span>
                  <p className="font-medium">{product.year}</p>
                </div>
                <div>
                  <span className="text-base-content/70">Category:</span>
                  <p className="font-medium">{product.category}</p>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-lg font-semibold text-base-content mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-base-200 text-base-content/70 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Description and Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 space-y-8"
        >
          {/* Description */}
          <div>
            <h2 className="text-2xl font-serif font-bold text-base-content mb-4">Description</h2>
            <p className="text-base-content/80 leading-relaxed text-lg">
              {product.description}
            </p>
          </div>

          {/* Artist's Story */}
          <div>
            <h2 className="text-2xl font-serif font-bold text-base-content mb-4">Artist's Story</h2>
            <p className="text-base-content/80 leading-relaxed text-lg">
              {product.story}
            </p>
          </div>
        </motion.div>

        {/* Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-serif font-bold text-base-content">
              Reviews ({product.reviews.length})
            </h2>
            <button className="btn-outline">
              <MessageCircle className="w-4 h-4 mr-2" />
              Write Review
            </button>
          </div>

          <div className="space-y-4">
            {product.reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-base-200 rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{review.user}</span>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? 'text-yellow-500 fill-current' : 'text-base-content/30'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-base-content/70">{review.date}</span>
                </div>
                <p className="text-base-content/80">{review.comment}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ProductDetail

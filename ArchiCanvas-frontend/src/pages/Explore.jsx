import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Star, Heart, Eye, ShoppingCart } from 'lucide-react'
import { FileText, LayoutGrid } from 'lucide-react'

const Explore = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState("");

  // ✅ Fetch posts from backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/posts`
        )
        setPosts(res.data || []) // backend returns array of posts
      } catch (err) {
        console.error(err)
        setError("Failed to load posts. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
    fetchPosts();
    const interval = setInterval(() => {
      fetchPosts();
    }, 50000); // 50 seconds
    return () => clearInterval(interval);
  }, [])
  //const img = ;
  console.log("hiii",posts)

  return (
    <div className="min-h-screen bg-base-100">
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 py-16">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold">
            Explore Posts
          </h1>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
            Discover stories and creations shared by the community
          </p>
          <div className="max-w-md mx-auto mt-6">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search posts..."
              className="w-full border border-base-300 rounded-lg px-3 py-2 text-black"
            />
          </div>
        </div>
      </div>

      {/* Loading / Error */}
      {loading && <div className="text-center py-20">Loading posts...</div>}
      {error && <div className="text-center py-20 text-red-500">{error}</div>}

      {/* Posts Grid */}
      {!loading && !error && (
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts
            .filter(post => post.title?.toLowerCase().includes(search.toLowerCase()))
            .map((post, index) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-base-100 rounded-xl overflow-hidden shadow-lg border border-base-300"
            >
              <div className="relative">
                <img
                    src={`${import.meta.env.VITE_API_BASE_URL}${post.photoUrl}`}
                  alt={post.title}
                  className="w-full h-64 object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                <p className="text-sm text-base-content/70 mb-2">
                  {post.description}
                </p>
                <p className="text-sm text-base-content/50 mb-4">
                  {post.story}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags?.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-base-200 rounded-full text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/posts/${post._id}`}
                  className="btn-primary w-full flex items-center justify-center"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  View Post
                </Link>
                {/* View Type Icon Example (next to View Post) */}
                <div className="mt-2 flex items-center justify-center text-base-content/70">
                  <LayoutGrid className="w-4 h-4 mr-1" />
                  View Type
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Explore

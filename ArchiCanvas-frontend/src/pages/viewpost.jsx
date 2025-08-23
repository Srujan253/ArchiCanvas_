import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Heart, Share2, MessageCircle, ArrowLeft } from 'lucide-react';

const ViewPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [showFullStory, setShowFullStory] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/posts/${id}`,{ withCredentials: true });
        setPost(res.data);
      } catch (err) {
        setError('Failed to load post.');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading post...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!post) return null;

  // Story truncation logic
  const storyLimit = 200;
  const isLongStory = post.story && post.story.length > storyLimit;
  const displayedStory = showFullStory || !isLongStory
    ? post.story
    : post.story.slice(0, storyLimit) + '...';

  return (
    <div className="min-h-screen bg-base-100 py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Back Button */}
        <button
          className="btn btn-ghost mb-6 flex items-center"
          onClick={() => navigate('/explore')}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Explore
        </button>

        {/* Post Card */}
        <div className="flex flex-col md:flex-row gap-8 bg-white rounded-2xl shadow-lg border border-base-300 p-6">
          
          {/* Image */}
          <div className="md:w-1/2 flex justify-center items-start">
            <img
              src={`${import.meta.env.VITE_API_BASE_URL}${post.photoUrl}`}
              alt={post.title}
              className="rounded-xl w-full max-w-md object-cover"
            />
          </div>

          {/* Details */}
          <div className="md:w-1/2 flex flex-col justify-start">
            <h2 className="text-3xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-700 mb-4 text-lg">{post.description || 'No description available.'}</p>

            {/* Story */}
            <div className="mb-4">
              <span className="font-semibold text-gray-800">Story:</span>
              <p className="text-gray-600 mt-2">
                {displayedStory || 'No story available.'}
                {isLongStory && !showFullStory && (
                  <button
                    className="ml-2 text-primary-600 underline text-sm"
                    onClick={() => setShowFullStory(true)}
                  >
                    Read more
                  </button>
                )}
                {isLongStory && showFullStory && (
                  <button
                    className="ml-2 text-primary-600 underline text-sm"
                    onClick={() => setShowFullStory(false)}
                  >
                    Show less
                  </button>
                )}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-6 mt-6">
              <button className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition">
                <Heart className="w-5 h-5" /> Like
              </button>
              <button className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition">
                <Share2 className="w-5 h-5" /> Share
              </button>
              <button className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition">
                <MessageCircle className="w-5 h-5" /> Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPost;

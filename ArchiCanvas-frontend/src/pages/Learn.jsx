
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Play, Plus } from 'lucide-react';
import LearnCreator from '../components/LearnCretor.jsx';

const mockVideos = [
  {
    id: 1,
    title: 'Watercolor Basics for Beginners',
    description: 'Learn the fundamentals of watercolor painting with this step-by-step course.',
    thumbnail: 'https://img.youtube.com/vi/1A2B3C4D5E6/0.jpg',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    id: 2,
    title: 'Digital Art: Getting Started',
    description: 'A beginner-friendly guide to digital art tools and techniques.',
    thumbnail: 'https://img.youtube.com/vi/2B3C4D5E6F7/0.jpg',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
  },
  {
    id: 3,
    title: 'Architectural Sketching',
    description: 'Tips and tricks for sketching beautiful architectural designs.',
    thumbnail: 'https://img.youtube.com/vi/3C4D5E6F7G8/0.jpg',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
];

const Learn = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showLearnCreator, setShowLearnCreator] = useState(false);
  const { user } = useAuth();

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
              Learn
            </h1>
            <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
              Master new skills with expert-led courses and tutorials from our community of artists and architects
            </p>
            {user?.role === 'artist' && (
              <button
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl mt-6 shadow-lg hover:scale-105 transition-transform"
                onClick={() => setShowLearnCreator(true)}
              >
                <Plus className="w-5 h-5" />
                Upload Course
              </button>
            )}
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {mockVideos.map(video => (
            <div
              key={video.id}
              className="bg-base-200 rounded-xl shadow-lg overflow-hidden cursor-pointer hover:scale-[1.03] transition-transform"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Play className="w-12 h-12 text-white opacity-80" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2 line-clamp-2">{video.title}</h3>
                <p className="text-base-content/70 text-sm line-clamp-3">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-base-100 rounded-xl shadow-2xl max-w-2xl w-full p-6 relative">
            <button
              className="absolute top-2 right-2 text-base-content/60 hover:text-base-content text-xl"
              onClick={() => setSelectedVideo(null)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-2">{selectedVideo.title}</h2>
            <p className="mb-4 text-base-content/70">{selectedVideo.description}</p>
            <video
              src={selectedVideo.videoUrl}
              controls
              autoPlay
              className="w-full rounded-lg"
              poster={selectedVideo.thumbnail}
            />
          </div>
        </div>
      )}

      {/* LearnCreator Modal */}
      {showLearnCreator && (
        <LearnCreator onClose={() => setShowLearnCreator(false)} />
      )}
    </div>
  );
};

export default Learn;

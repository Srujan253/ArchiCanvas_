import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // We'll use this to get the user role
import CreateCommunity from '../components/createcommunity';
import axios from 'axios'; // For making API calls
import toast from 'react-hot-toast';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/communities`; // Your backend URL

const Community = () => {
    const [communities, setCommunities] = useState([]); // State to hold communities from the backend
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showCreateForm, setShowCreateForm] = useState(false);
    const { user } = useAuth(); // Get user from your AuthContext
    const navigate = useNavigate();

    // --- Fetch communities from the backend ---
    useEffect(() => {
        const fetchCommunities = async () => {
            try {
                setLoading(true);
                // The auth token is sent automatically by the axios config in your AuthContext
                const response = await axios.get(API_URL, {
                    params: { search: searchTerm } ,
                     withCredentials: true // Add search term as a query parameter
                });
                setCommunities(response.data.data.communities);
            } catch (error) {
                toast.error('Failed to fetch communities.');
                console.error("Fetch communities error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCommunities();
        const interval = setInterval(() => {
            fetchCommunities();
        }, 50000); // 50 seconds
        return () => clearInterval(interval);
    }, [searchTerm]); // Re-fetch when searchTerm changes and every 50s

    // The 'filteredCommunities' logic is now handled by the backend search
    const displayedCommunities = communities;

    return (
        <div className="min-h-screen bg-base-100">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-serif font-bold text-base-content mb-4">
                        Community
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
                        className="text-xl text-base-content/70 max-w-2xl mx-auto">
                        Join vibrant discussions, share your work, and connect with fellow artists and collectors
                    </motion.p>
                    
                    {/* Create Community Button for artists */}
                    {user?.role === 'artist' && (
                        <div className="flex justify-center">
                            <button
                                onClick={() => setShowCreateForm(true)}
                                className="btn-primary mt-6 flex items-center space-x-2"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Create Community</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Create Community Form Modal */}
            {showCreateForm && <CreateCommunity onClose={() => setShowCreateForm(false)} />}

            {/* Search Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/40" />
                        <input
                            type="text"
                            placeholder="Search communities by name or description..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        />
                    </div>
                </div>

                {/* Communities Grid */}
                {loading ? (
                    <div className="text-center">Loading communities...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {displayedCommunities.length === 0 ? (
                            <div className="col-span-3 text-center text-base-content/70 py-12">No communities found. Try a different search.</div>
                        ) : (
                            displayedCommunities.map(comm => (
                                <div key={comm._id} className="bg-base-200 rounded-xl shadow-lg p-6 flex flex-col">
                                    <h2 className="text-xl font-bold mb-2">{comm.name}</h2>
                                    <p className="mb-4 text-base-content/70 flex-grow">{comm.description}</p>
                                    <div className="mb-4 text-base-content/60">Members: {comm.memberCount}</div>
                                    <button
                                        className="btn-primary mt-auto"
                                        onClick={() => navigate(`/community/${comm._id}`)}
                                    >
                                        View Community
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Community;
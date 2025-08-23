// File: src/pages/NewsPage.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

// --- CONFIGURATION ---
const apiKey = import.meta.env.VITE_NEWS_API_KEY;

// CHANGED: The API URL now searches for art-related keywords instead of the technology category.
// We are searching for 'art' OR 'culture' OR 'museum' and sorting by popularity.
const API_URL = `https://newsapi.org/v2/everything?q=(art OR culture OR museum OR exhibition)&sortBy=popularity&language=en&apiKey=${apiKey}`;

// --- (The Loader, ErrorMessage, and NewsCard components from the previous answer remain the same) ---

const Loader = () => (
    <div className="col-span-full flex justify-center items-center py-20">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary-500"></div>
    </div>
);

const ErrorMessage = ({ message }) => (
    <div className="col-span-full text-center bg-red-100 dark:bg-red-900/30 p-6 rounded-lg border border-red-300 dark:border-red-700">
        <h2 className="font-bold text-red-800 dark:text-red-200">Something Went Wrong</h2>
        <p className="text-red-600 dark:text-red-300 mt-2">{message}</p>
    </div>
);

const NewsCard = ({ article, index }) => (
    <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-2xl overflow-hidden flex flex-col group transition-all duration-300"
    >
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="block relative">
            <img 
                src={article.urlToImage} 
                alt={article.title} 
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <p className="absolute bottom-4 left-4 text-white text-sm font-semibold bg-primary-500/80 px-3 py-1 rounded-full">
                {article.source.name}
            </p>
        </a>
        <div className="p-6 flex flex-col flex-grow">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex-grow">
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    {article.title}
                </a>
            </h2>
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="mt-auto text-primary-500 dark:text-primary-400 font-bold hover:underline self-start">
                Read More →
            </a>
        </div>
    </motion.div>
);


const NewsPage = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            if (!apiKey) {
                setError('News API key is missing. Please add VITE_NEWS_API_KEY to your .env file.');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await axios.get(API_URL,{ withCredentials: true });
                const filteredArticles = response.data.articles.filter(article => article.urlToImage && article.title && article.description);
                setArticles(filteredArticles);
            } catch (err) {
                setError('Failed to fetch news. The API might be down or your key is invalid.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    const renderContent = () => {
        if (loading) return <Loader />;
        if (error) return <ErrorMessage message={error} />;
        if (articles.length === 0) return <p className="col-span-full text-center text-slate-500 py-12">No relevant art & culture news found at the moment.</p>;
        return articles.map((article, index) => (
            <NewsCard key={article.url + index} article={article} index={index} />
        ));
    };

    return (
        <div className="min-h-screen bg-base-100 dark:bg-slate-900">
            <div className="container mx-auto px-4 py-8 md:px-8 md:py-12">
                 {/* CHANGED: The title and description are now about art */}
                <header className="text-center mb-12">
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-serif font-bold text-base-content mb-3"
                    >
                        Art & Culture News
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg text-base-content/70"
                    >
                        Discover the latest stories from the global art scene
                    </motion.p>
                </header>
                <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default NewsPage;
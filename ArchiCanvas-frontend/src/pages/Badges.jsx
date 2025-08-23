// File: src/pages/Badges.jsx

import React, { useState, useEffect } from 'react';
import { Award } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext'; // Assuming you use this
import toast from 'react-hot-toast';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/users/my-badges`;

const Badges = () => {
    const [productCount, setProductCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth(); // Get the logged-in user

    // Define the 4 innovative badges
    const allBadges = [
        {
            name: "Innovator",
            color: "yellow-500",
            description: "Awarded for publishing 3 artworks."
        },
        {
            name: "Trendsetter",
            color: "blue-500",
            description: "Awarded for publishing 5 artworks."
        },
        {
            name: "Visionary",
            color: "purple-500",
            description: "Awarded for publishing 10 artworks."
        },
        {
            name: "Master Creator",
            color: "green-500",
            description: "Awarded for publishing 20 artworks."
        }
    ];

    useEffect(() => {
        const fetchBadges = async () => {
            if (!user) {
                setLoading(false);
                return;
            }
            try {
                // The auth token is sent automatically by your axios setup in AuthContext
                const response = await axios.get(API_URL,{ withCredentials: true });
                setProductCount(response.data.productCount);
            } catch (error) {
                toast.error("Could not fetch your badges.");
                console.error("Fetch badges error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBadges();
    }, [user]);

    // Determine earned badges based on productCount
    const earnedBadges = [];
    if (productCount >= 3) earnedBadges.push({ ...allBadges[0], earnedAt: `After 3 artworks` });
    if (productCount >= 5) earnedBadges.push({ ...allBadges[1], earnedAt: `After 5 artworks` });
    if (productCount >= 10) earnedBadges.push({ ...allBadges[2], earnedAt: `After 10 artworks` });
    if (productCount >= 20) earnedBadges.push({ ...allBadges[3], earnedAt: `After 20 artworks` });

    if (loading) {
        return <div className="text-center p-12">Loading Your Badges...</div>;
    }
    
    if (!user) {
         return <div className="text-center p-12">Please log in to see your badges.</div>;
    }

    return (
        <div className="max-w-5xl mx-auto mt-10 px-4">
            <h1 className="text-3xl font-bold text-center mb-2">My Badges ({earnedBadges.length})</h1>
            <p className="text-center text-gray-500 mb-8">You have published {productCount} artworks.</p>

            {earnedBadges.length === 0 ? (
                <div className="text-center p-12 bg-gray-50 rounded-xl">
                    <h2 className="text-xl font-semibold">No badges yet!</h2>
                    <p className="text-gray-600 mt-2">Publish your first 3 artworks to earn the "Innovator" badge.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {earnedBadges.map((badge, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center bg-white p-6 rounded-xl shadow-lg transition-transform hover:scale-105"
                        >
                            <Award className={`w-12 h-12 text-${badge.color} mb-3`} />
                            <h2 className="text-xl font-semibold">{badge.name}</h2>
                            <p className="text-gray-500 text-center mt-1">{badge.description}</p>
                            <p className="text-gray-500 text-center mt-1">
                                {badge.earnedAt}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Badges;
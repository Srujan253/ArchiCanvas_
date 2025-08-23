import React, { useState, useEffect } from 'react';
import Bynow from './popup_function.jsx';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/products`;

const ProductSale = () => {
    const [popupOpen, setPopupOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newReview, setNewReview] = useState({ rating: 0, comment: '' });

    const { user } = useAuth();

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_URL,{ withCredentials: true });
            setProducts(response?.data?.products || []);
            if (response?.data?.products?.length > 0) {
                setSelectedProduct(response?.data?.products[0]);
            }
        } catch (error) {
            toast.error("Failed to load products.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
        const interval = setInterval(() => {
            fetchProducts();
        }, 50000); // 50 seconds
        return () => clearInterval(interval);
    }, []);

    const handleReviewSubmit = async () => {
        if (!user) return toast.error("You must be logged in to leave a review.");
        if (!newReview.comment || newReview.rating === 0) return toast.error("Please provide a rating and a comment.");

        try {
            await axios.post(`${API_URL}/${selectedProduct._id}/reviews`, newReview, { withCredentials: true });
            toast.success("Review submitted successfully!");
            setNewReview({ rating: 0, comment: '' });
            fetchProducts();
        } catch (error) {
            toast.error("Failed to submit review.");
        }
    };

    if (loading) return <div className="text-center p-12">Loading Products...</div>;

    return (
        <div className="max-w-7xl mx-auto p-8 space-y-12">
            
            {/* Display selected product image at the top */}
            {selectedProduct && (
                <div className="w-full flex justify-center mb-8">
                    <img
                        src={`${import.meta.env.VITE_API_BASE_URL}${selectedProduct.photo}`}
                        alt={selectedProduct.name}
                        className="w-48 h-48 object-cover rounded-full shadow-lg border-4 border-primary-500"
                    />
                </div>
            )}

            {/* Product Selector Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.map(product => (
                    <div 
                        key={product._id} 
                        className={`border rounded-xl p-4 cursor-pointer hover:shadow-lg transition ${selectedProduct?._id === product._id ? 'border-primary-500 shadow-lg' : 'border-gray-200'}`}
                        onClick={() => setSelectedProduct(product)}
                    >
                        <img  
                            src={`${import.meta.env.VITE_API_BASE_URL}/watermark${product.photo}`}
                            alt={product.name} 
                            className="w-full h-40 object-cover rounded-lg mb-3" 
                        />
                        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                        <p className="text-gray-600 mb-1">${product.price}</p>
                    </div>
                ))}
            </div>

            {/* Selected Product Details */}
            {selectedProduct && (
                <div className="border rounded-xl p-6 bg-base-200 shadow-md">
                    <h1 className="text-2xl font-bold mb-2">{selectedProduct.name}</h1>
                    <p className="text-base-content/70 mb-2">{selectedProduct.description}</p>
                    <p className="text-base-content/70 mb-2">
                        Artist: <span className="font-semibold">{selectedProduct.artistName || 'Unknown'}</span>
                    </p>
                    <p className="font-semibold text-lg mb-4">Price: ${selectedProduct.price}</p>

                    {/* {user && (
                        <div className="mt-8 border-t pt-4">
                            <h3 className="text-lg font-semibold mb-2">Leave a Comment</h3>
                            <textarea
                                placeholder="Your comment..."
                                value={newReview.comment}
                                onChange={e => setNewReview({ ...newReview, comment: e.target.value })}
                                className="w-full p-2 border rounded mb-2"
                            />
                            <button
                                onClick={handleReviewSubmit}
                                className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600 transition"
                            >
                                Submit Review
                            </button>
                        </div>
                    )} */}

                    {/* Buy Now Popup */}
                    <Bynow 
                        isOpen={popupOpen} 
                        onClose={() => setPopupOpen(false)} 
                        selectedProduct={selectedProduct} 
                    />
                </div>
            )}
        </div>
    );
};

export default ProductSale;

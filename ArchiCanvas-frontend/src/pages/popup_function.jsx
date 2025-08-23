import React, { useState } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/products`;

// --- The Popup Component (No changes needed) ---
const BuyNowPopup = ({ artist, isOpen, onClose }) => {
    if (!isOpen || !artist) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative text-black">
                <button className="absolute top-4 right-4 text-gray-700 hover:text-black" onClick={onClose}>
                    <X className="w-5 h-5" />
                </button>
                <h2 className="text-xl font-bold mb-4">Inquiry Sent!</h2>
                <p className="mb-4">The artist has been notified of your interest and will respond shortly.</p>
                <p className="mb-4">Thank you for your request.</p>

                {/* <div className="border-t pt-4">
                    <h3 className="font-semibold mb-2">Artist Details:</h3>
                    <p><span className="font-medium">Name:</span> {artist.name}</p>
                    <p><span className="font-medium">Email:</span> {artist.email}</p>
                </div> */}
                <button className="mt-6 w-full bg-primary-500 hover:bg-primary-600 text-white py-2 rounded-lg" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};


// --- The Main Component that USES the popup ---
// It needs the selectedProduct passed in as a prop
const Bynow = ({ selectedProduct }) => {
    const [popupOpen, setPopupOpen] = useState(false);
    const { user } = useAuth(); // Get the logged-in user

    const handleBuyNow = async () => {
        // 1. Check if user is logged in
                   

        if (!user) {
            toast.error("You must be logged in to contact the artist.");
            return;
        }
       console.log("hiii",selectedProduct);
        if (!selectedProduct) return;
  
        try {
            // 2. Call the backend to send the email
            const response = await axios.post(`${API_URL}/${selectedProduct._id}/buy-request`,{ withCredentials: true });
            
            // 3. On success, show a toast and open the popup
            toast.success(response.data.message);
            setPopupOpen(true);
            console.log(response.data);

        } catch (error) {
            toast.error(error.response?.data?.message || "you cannot buy your own ArtWork.");
            console.log(error);

        }
    };

    return (
        <div>
            <button
                className="btn btn-primary"
                onClick={handleBuyNow}
            >
                Buy Now
            </button>

            <BuyNowPopup
                artist={selectedProduct?.user} 
                isOpen={popupOpen}
                onClose={() => setPopupOpen(false)}
            />
        </div>
    );
};

export default Bynow;
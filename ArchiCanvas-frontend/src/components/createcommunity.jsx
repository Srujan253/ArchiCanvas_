import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import apiClient from '../api/axios';
import toast from 'react-hot-toast';


const CreateCommunity = ({ onClose }) => {
    const [formData, setFormData] = useState({ name: '', description: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await apiClient.post("/communities", formData);
            toast.success(response.data.message || 'Community submitted for approval!');
            onClose(); // Close the modal on success
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create community.');
            console.error("Create community error:", error);
        } finally {
            setIsLoading(false);
        }
    };
   

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-base-100 rounded-lg shadow-xl p-8 w-full max-w-md relative"
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-base-content/50 hover:text-base-content">
                    <X />
                </button>
                <h2 className="text-2xl font-bold mb-6 text-center">Create a New Community</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-base-content mb-2">Community Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-base-300 rounded-lg"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-base-content mb-2">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows="4"
                            className="w-full p-2 border border-base-300 rounded-lg resize-none"
                        ></textarea>
                    </div>
                    <button type="submit" disabled={isLoading} className="btn-primary w-full">
                        {isLoading ? 'Submitting...' : 'Submit for Approval'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default CreateCommunity;
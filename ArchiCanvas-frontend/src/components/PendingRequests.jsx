import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/communities`;

const PendingRequests = ({ communityId, onAction }) => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRequests = async () => {
        try {
            const res = await axios.get(`${API_URL}/${communityId}/pending-requests`, 
  { withCredentials: true });
            setRequests(res.data.data.pendingRequests);
        } catch (error) {
            console.error(error);
            toast.error("Could not load pending requests.");
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchRequests();
    }, [communityId]);

    const handleApprove = async (memberId) => {
        try {
            await axios.post(`${API_URL}/${communityId}/approve-member`, { memberId },
                { withCredentials: true }
            );
            toast.success("Member approved!");
            fetchRequests(); // Refresh the list of pending requests
            onAction(); // Refresh the main page data (e.g., member count)
        } catch (error) {
            toast.error("Failed to approve member.");
        }
    };

    const handleReject = async (memberId) => {
        try {
            await axios.post(`${API_URL}/${communityId}/reject-member`, { memberId },
                { withCredentials: true }
            );
            toast.success("Member rejected.");
            fetchRequests();
            onAction();
        } catch (error) {
            toast.error("Failed to reject member.");
        }
    };

    if (loading) return <div>Loading requests...</div>;

    return (
        <div className="bg-base-200 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-bold mb-4">Pending Join Requests</h3>
            {requests.length === 0 ? (
                <p className="text-base-content/70">No pending requests.</p>
            ) : (
                <ul className="space-y-3">
                    {requests.map(req => (
                        <li key={req._id} className="flex justify-between items-center bg-base-100 p-3 rounded">
                            <span>{req.name} ({req.email})</span>
                            <div className="flex gap-2">
                                <button onClick={() => handleApprove(req._id)} className="btn btn-success btn-sm">Approve</button>
                                <button onClick={() => handleReject(req._id)} className="btn btn-error btn-sm">Reject</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PendingRequests;
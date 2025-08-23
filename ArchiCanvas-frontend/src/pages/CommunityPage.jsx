import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import PendingRequests from '../components/PendingRequests';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/communities`;

const CommunityPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
               


    const [community, setCommunity] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newMessage, setNewMessage] = useState('');
    const chatEndRef = useRef(null);

    const fetchData = async () => {
        try {
            const communityRes = await axios.get(`${API_URL}/${id}`,{ withCredentials: true });
            console.log("jii",communityRes);
            const fetchedCommunity = communityRes.data.data.community;
            setCommunity(fetchedCommunity);

            const isUserMember = fetchedCommunity.members.some(member => member._id === user?._id);
            if (isUserMember) {
                const messagesRes = await axios.get(`${API_URL}/${id}/messages`,{ withCredentials: true });
                setMessages(messagesRes.data.data.messages);
            }
        } catch (error) {
            toast.error("Could not load community details.");
            navigate('/community');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if(user) fetchData(); // Only fetch data once the user is loaded
    }, [id, user]);
    
    useEffect(() => {
        const isUserMember = community?.members.some(member => member._id === user?._id);
        if (!isUserMember) return;

        const interval = setInterval(async () => {
            const res = await axios.get(`${API_URL}/${id}/messages`,{ withCredentials: true });
            setMessages(res.data.data.messages);
        }, 3000);

        return () => clearInterval(interval);
    }, [id, community, user?._id]);

    // Removed auto-scroll-to-bottom effect on messages update

    const handleRequestJoin = async () => {
        try {
            const res = await axios.post(`${API_URL}/${id}/request-join`,{ withCredentials: true });
            toast.success(res.data.message);
            fetchData();
        } catch (error) {
            toast.error("Failed to send join request.");
        }
    };
    
    const handleLeave = async () => {
        try {
            await axios.post(`${API_URL}/${id}/leave`,{ withCredentials: true });
            toast.success(`You have left ${community.name}.`);
            fetchData();
        } catch (error) {
            toast.error("Failed to leave community.");
        }
    };

    const handlePostMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        try {
            await axios.post(`${API_URL}/${id}/messages`, { content: newMessage },{ withCredentials: true });
            setNewMessage('');
            const res = await axios.get(`${API_URL}/${id}/messages`,{ withCredentials: true });
            setMessages(res.data.data.messages);
        } catch (error) {
            toast.error("Failed to send message.");
        }
    };

    if (loading || !community) {
        return <div className="text-center p-12">Loading Community...</div>;
    }

    // --- LOGIC CHECKS ---
    const isMember = community.members.some(member => member._id === user?._id);
    const isOwner = community.creator._id === user?._id;
    
    // --- THIS IS THE CORRECTED LINE ---
    // We need to check the array of objects for the user's ID
    const hasRequested = community.pendingMembers.some(member => member._id === user?._id);

    const renderJoinButton = () => {
        if (isOwner) return <span className="badge badge-lg badge-success">You are the owner</span>;
        if (isMember) return <button onClick={handleLeave} className="btn btn-error">Leave Community</button>;
        if (hasRequested) return <button className="btn btn-disabled">Request Sent</button>;
        return <button onClick={handleRequestJoin} className="btn btn-primary">Request to Join</button>;
    };

    return (
        <div className="min-h-screen bg-base-100 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <button onClick={() => navigate('/community')} className="btn btn-ghost mb-6">
                    ← Back to Communities
                </button>

                <div className="bg-base-200 p-6 rounded-lg mb-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">{community.name}</h1>
                            <p className="text-base-content/70">Created by {community.creator.name}</p>
                            <p className="mt-4">{community.description}</p>
                        </div>
                        {renderJoinButton()}
                    </div>
                    <div className="mt-4 font-semibold">{community.memberCount} Members</div>
                </div>

                {/* The owner sees the pending requests panel */}
                {isOwner && <PendingRequests communityId={id} onAction={fetchData} />}

                {/* Approved members see the chat */}
                {isMember ? (
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-4">Live Chat</h2>
                        <div className="bg-base-200 h-96 p-4 rounded-lg overflow-y-auto flex flex-col gap-4 mb-4">
                            {messages.map(msg => (
                                <div key={msg._id} className="chat-message">
                                    <p><strong>{msg.author.name}:</strong> {msg.content}</p>
                                </div>
                            ))}
                            <div ref={chatEndRef} />
                        </div>
                        <form onSubmit={handlePostMessage} className="flex gap-4">
                            <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type your message..." className="input input-bordered flex-grow"/>
                            <button type="submit" className="btn btn-primary">Send</button>
                        </form>
                    </div>
                ) : (
                     <div className="text-center p-12 bg-base-200 rounded-lg mt-8">
                         <h3 className="text-xl font-bold">Join the community to participate in the chat.</h3>
                         <p className="text-base-content/70">Your request will be reviewed by the owner.</p>
                     </div>
                )}
            </div>
        </div>
    );
};

export default CommunityPage;
import React, { useState } from 'react';
import CommunityPost from '../components/CommunityPost';
import CommunitySidebar from '../components/CommunitySidebar';

const defaultCommunityInfo = {
  name: 'Sample Community',
  description: 'Welcome to the Sample Community! Share your thoughts, ask questions, and connect with others.',
  memberCount: 1,
};

const initialPosts = [];

const SampleCommunity = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [communityInfo, setCommunityInfo] = useState(defaultCommunityInfo);
  const [newPost, setNewPost] = useState({ title: '', description: '' });

  const handleUpvote = (id) => {
    setPosts(posts => posts.map(post => post.id === id ? { ...post, votes: (post.votes || 0) + 1 } : post));
  };

  const handleDownvote = (id) => {
    setPosts(posts => posts.map(post => post.id === id ? { ...post, votes: (post.votes || 0) - 1 } : post));
  };

  const handleInputChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPost.title || !newPost.description) return;
    const post = {
      id: Date.now(),
      title: newPost.title,
      description: newPost.description,
      author: 'Anonymous',
      votes: 0,
    };
    setPosts([post, ...posts]);
    setNewPost({ title: '', description: '' });
  };

  return (
    <div className="min-h-screen bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
        {/* Main Column */}
        <main className="flex-1 md:mr-8">
          <form onSubmit={handleCreatePost} className="bg-base-200 rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Create a Post</h2>
            <input
              type="text"
              name="title"
              value={newPost.title}
              onChange={handleInputChange}
              placeholder="Title"
              className="w-full mb-2 px-3 py-2 border border-base-300 rounded-lg"
              required
            />
            <textarea
              name="description"
              value={newPost.description}
              onChange={handleInputChange}
              placeholder="Description"
              className="w-full mb-2 px-3 py-2 border border-base-300 rounded-lg"
              rows={3}
              required
            />
            <button type="submit" className="btn-primary px-6 py-2">Post</button>
          </form>
          <div>
            {posts.length === 0 ? (
              <div className="text-center text-base-content/70">No posts yet. Be the first to post!</div>
            ) : (
              posts.map(post => (
                <CommunityPost
                  key={post.id}
                  post={post}
                  onUpvote={handleUpvote}
                  onDownvote={handleDownvote}
                />
              ))
            )}
          </div>
        </main>
        {/* Sidebar */}
        <CommunitySidebar info={communityInfo} />
      </div>
    </div>
  );
};

export default SampleCommunity;

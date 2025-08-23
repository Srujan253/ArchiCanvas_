import React, { useState } from "react";
import { X, Plus } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
const MAX_TAGS = 10;

const PostCreator = ({ open, onClose, onSubmit }) => {
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [story, setStory] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [error, setError] = useState("");

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPreview(file ? URL.createObjectURL(file) : "");
  };

  const handleTagInput = (e) => setTagInput(e.target.value);

  const handleAddTag = () => {
    let tag = tagInput.trim();
    if (!tag) return;
    if (tags.length >= MAX_TAGS) return setError("Maximum 10 tags allowed");
    if (!tag.startsWith("#")) tag = `#${tag}`;
    if (tags.includes(tag)) return setError("Tag already added");
    setTags([...tags, tag]);
    setTagInput("");
    setError("");
  };

  const handleRemoveTag = (tag) => setTags(tags.filter((t) => t !== tag));

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!photo || !title || !description || !story) return setError("All fields are required");
  if (tags.length === 0) return setError("At least one tag is required");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("title", title);
  formData.append("description", description);
  formData.append("story", story);
  formData.append("tags", JSON.stringify(tags));

  try {
    const res = await axios.post(`${API_BASE_URL}/posts`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    onSubmit(res.data);
    onClose();
  } catch (err) {
    console.error(err);
    setError(err.response?.data?.error || "Failed to submit post");
  }
};

  if (!open) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-base-100 rounded-2xl shadow-2xl w-full max-w-lg relative p-6 md:p-8"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
      >
        <button
          className="absolute top-4 right-4 text-base-content/60 hover:text-base-content transition"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold text-center mb-6">Create a Post</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="block font-medium">Photo</label>
            <input type="file" accept="image/*" onChange={handlePhotoChange} className="w-full" />
            {preview && (
              <div className="relative mt-2">
                <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded-lg shadow-sm" />
                <button
                  type="button"
                  onClick={() => setPreview("") || setPhoto(null)}
                  className="absolute top-2 right-2 bg-black/50 p-1 rounded-full hover:bg-red-500 transition text-white"
                >
                  <X size={18} />
                </button>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-base-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition text-black"
              placeholder="Enter title"
              maxLength={100}
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-base-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition text-black"
              rows={2}
              placeholder="Short description"
              maxLength={300}
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Story Behind the Picture</label>
            <textarea
              value={story}
              onChange={(e) => setStory(e.target.value)}
              className="w-full border border-base-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition text-black"
              rows={3}
              placeholder="Your story..."
              maxLength={500}
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Tags</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={handleTagInput}
                className="flex-1 border border-base-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 transition text-black"
                placeholder="Add tag"
                maxLength={20}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
              />
              <button type="button" onClick={handleAddTag} className="btn-primary px-4 py-2">Add</button>
            </div>
            <div className="flex flex-wrap gap-2 mt-1">
              {tags.map((tag) => (
                <motion.span
                  key={tag}
                  className="bg-cyan-600 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm cursor-pointer hover:bg-cyan-700 transition"
                  whileHover={{ scale: 1.05 }}
                >
                  {tag}
                  <X size={16} onClick={() => handleRemoveTag(tag)} />
                </motion.span>
              ))}
            </div>
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div className="flex justify-end gap-4 mt-4">
            <button type="button" onClick={onClose} className="btn-outline px-6 py-2">Cancel</button>
            <button type="submit" className="btn-primary px-6 py-2 flex items-center gap-2">
              <Plus size={18} /> Post
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default PostCreator;

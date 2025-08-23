import React, { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { motion } from "framer-motion";

const MAX_TAGS = 10;

const ProductCreator = ({ open, onClose }) => {
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isBiddable, setIsBiddable] = useState(false);
  const [biddingDays, setBiddingDays] = useState(1);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [error, setError] = useState("");

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPreview(file ? URL.createObjectURL(file) : "");
  };

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
    if (!photo || !title || !description || !price)
      return setError("All fields are required");

    try {
      const formData = new FormData();
      formData.append("photo", photo);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("isBiddable", isBiddable);
      if (isBiddable) {
        formData.append("biddingDays", biddingDays);
      }
      formData.append("tags", JSON.stringify(tags));

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/products`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Uploaded:", res.data);
      onClose();
    } catch (err) {
      console.error(err);
      setError("Upload failed");
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
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative p-6 md:p-8"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold text-center mb-6">
          Create a Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Photo Upload */}
          <div className="space-y-2">
            <label className="block font-medium">Photo</label>
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
            {preview && (
              <div className="relative mt-2">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg shadow-sm"
                />
              </div>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Enter title"
              maxLength={100}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              rows={2}
              placeholder="Short description"
              maxLength={300}
            />
          </div>

          {/* Price */}
          <div>
            <label className="block font-medium">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Enter price"
            />
          </div>

          {/* Biddable Option */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isBiddable}
              onChange={() => setIsBiddable(!isBiddable)}
            />
            <label className="font-medium">Enable Bidding</label>
          </div>

          {isBiddable && (
            <div>
              <label className="block font-medium">
                Bidding Duration (1-3 days)
              </label>
              <input
                type="number"
                min="1"
                max="3"
                value={biddingDays}
                onChange={(e) => setBiddingDays(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          )}

          {/* Tags */}
          <div>
            <label className="block font-medium">Tags</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="flex-1 border rounded-lg px-3 py-2"
                placeholder="Add tag"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-1"
                >
                  {tag}
                  <X
                    size={16}
                    className="cursor-pointer"
                    onClick={() => handleRemoveTag(tag)}
                  />
                </span>
              ))}
            </div>
          </div>

          {error && <div className="text-red-500">{error}</div>}

          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded"
            >
              Upload
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ProductCreator;

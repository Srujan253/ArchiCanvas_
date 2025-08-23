import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import apiClient from '../api/axios';

const UploadCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [video, setVideo] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { user } = useAuth();

  // Base API URL from .env

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
    if (file) setPreviewUrl(URL.createObjectURL(file));
    else setPreviewUrl('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !video) {
      toast.error('Please fill all required fields and upload a video.');
      return;
    }

    setIsUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', tags);
    formData.append('video', video);
    formData.append('artistId', user?._id);

    try {
      const res = await apiClient.post(`/courses/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percent);
        },
      });

      if (res.data.success) {
        toast.success('Course uploaded successfully!');
        setTitle('');
        setDescription('');
        setTags('');
        setVideo(null);
        setPreviewUrl('');
        setProgress(0);
      } else {
        toast.error('Upload failed.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error uploading course.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-base-100 rounded-xl shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-4">Upload Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Course Title"
            required
            className="w-full border border-base-300 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Course Description"
            required
            rows={3}
            className="w-full border border-base-300 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Tags (comma separated)</label>
          <input
            type="text"
            value={tags}
            onChange={e => setTags(e.target.value)}
            placeholder="e.g. painting, digital, beginner"
            className="w-full border border-base-300 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Upload Video</label>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            required
            className="w-full"
          />
        </div>

        {previewUrl && (
          <div className="mt-4">
            <video controls src={previewUrl} className="w-full rounded-lg" />
          </div>
        )}

        {isUploading && (
          <div className="w-full bg-gray-200 h-4 rounded mt-2">
            <div
              className="bg-blue-500 h-4 rounded"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isUploading}
          className="btn-primary w-full py-2 text-lg disabled:opacity-50 mt-4"
        >
          {isUploading ? `Uploading... ${progress}%` : 'Upload Course'}
        </button>
      </form>
    </div>
  );
};

export default UploadCourse;

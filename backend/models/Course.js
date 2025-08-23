import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [{ type: String }],
    youtubeVideoId: { type: String, required: true },
    youtubeUrl: { type: String, required: true },
    artistId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Course', courseSchema);

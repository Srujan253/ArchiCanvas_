// File: controllers/artwork.controller.js
const { addWatermark } = require("../utils/watermark");
const path = require("path");
const fs = require("fs");
const User = require("../models/user.model");

const uploadArtwork = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const artistName = req.body.username || "Anonymous Artist";
    const watermarkText = `© ${artistName}`;

    const originalTempPath = req.file.path;
    const finalFileName = `watermarked-${Date.now()}.png`;
    const finalPath = path.join(__dirname, "..", "public", finalFileName);

    await addWatermark(originalTempPath, finalPath, watermarkText);
    fs.unlinkSync(originalTempPath);

    // Update artworkCount and badges for artist
    if (req.body.userId) {
      const user = await User.findById(req.body.userId);
      if (user && user.role === 'artist') {
        user.artworkCount = (user.artworkCount || 0) + 1;
        user.updateBadges();
        await user.save();
      }
    }

    res.status(200).json({
      message: "File uploaded and watermarked successfully!",
      imageUrl: `/images/${finalFileName}`,
    });
  } catch (error) {
    console.error("Error during upload:", error);
    res.status(500).json({ error: "Failed to process image." });
  }
};

module.exports = { uploadArtwork };

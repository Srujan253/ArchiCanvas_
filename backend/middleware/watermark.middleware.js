// File: middleware/watermark.middleware.js
const path = require('path');
const fs = require('fs');
const { addWatermark } = require('../utils/watermark');

const watermarkMiddleware = async (req, res, next) => {
    // This middleware runs after multer has saved a file.
    // We check if a file was actually uploaded.
    if (!req.file) {
        return next(); // No file, so we skip to the next function.
    }

    try {
        // Get the path of the original temporary file from multer
        const originalTempPath = req.file.path;

        // Get the artist's name from the logged-in user to create the watermark text
        // This assumes your 'isAuthenticatedUser' middleware has already run
        const artistName = req.user?.name || "Archicanvas";
        const watermarkText = `© ${artistName}`;

        // Define a new, permanent path for the watermarked image
        const artworksDir = path.join(__dirname, '..', 'public', 'artworks');
        if (!fs.existsSync(artworksDir)) {
            fs.mkdirSync(artworksDir, { recursive: true });
        }
        const finalFileName = `watermarked-${req.file.filename}.png`;
        const finalPath = path.join(artworksDir, finalFileName);

        // Call your existing watermark utility
        await addWatermark(originalTempPath, finalPath, watermarkText);

        // Delete the original, non-watermarked temporary file from the 'uploads' folder
        fs.unlinkSync(originalTempPath);

        // IMPORTANT: Update the request object with the new file path and URL
        // This makes the new path available to your final controller.
        req.file.path = finalPath;
        req.file.filename = finalFileName;
        req.file.destination = path.join('public', 'artworks');
        req.file.url = `/artworks/${finalFileName}`; // Create a URL for the frontend

        // Pass control to the next function in the chain (your controller)
        next();

    } catch (error) {
        console.error("Watermark middleware error:", error);
        return res.status(500).json({ error: 'Failed to apply watermark to the image.' });
    }
};

module.exports = watermarkMiddleware;
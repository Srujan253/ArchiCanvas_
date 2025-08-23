// File: routes/artwork.routes.js
const express = require("express");
const router = express.Router();

const { uploadArtwork } = require("../controllers/artwork.controller");
const uploadMiddleware = require("../middleware/upload.middleware");

// The route first uses the uploadMiddleware, then passes 
// the request to the uploadArtwork controller
router.post("/upload", uploadMiddleware, uploadArtwork);

module.exports = router;

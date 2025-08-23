// File: middleware/upload.middleware.js
const multer = require("multer");

// Configure Multer to save uploaded files to a temporary 'uploads/' directory
const upload = multer({ dest: "uploads/" });

// We export the middleware for a single file upload with the field name 'image'
module.exports = upload.single("image");

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { uploadCourse } = require('../controllers/courseController.js');

const router = express.Router();

// Multer setup
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

router.post('/upload', upload.single('video'), uploadCourse);

module.exports = router;

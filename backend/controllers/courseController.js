const Course = require('../models/Course.js');
const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.YT_CLIENT_ID,
  process.env.YT_CLIENT_SECRET,
  process.env.YT_REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: process.env.YT_REFRESH_TOKEN });

const youtube = google.youtube({ version: 'v3', auth: oauth2Client });

const uploadCourse = async (req, res) => {
  try {
    const { title, description, tags, artistId } = req.body;
    const videoFile = req.file;

    if (!title || !description || !videoFile || !artistId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Upload video to YouTube
    const response = await youtube.videos.insert({
      part: 'snippet,status',
      requestBody: {
        snippet: {
          title,
          description,
          tags: tags ? tags.split(',').map(t => t.trim()) : [],
        },
        status: {
          privacyStatus: 'private', // change if needed
        },
      },
      media: {
        body: fs.createReadStream(videoFile.path),
      },
    });

    // Delete local file after upload
    fs.unlinkSync(videoFile.path);

    const youtubeVideoId = response.data.id;
    const youtubeUrl = `https://youtu.be/${youtubeVideoId}`;

    // Save course info in DB
    const newCourse = await Course.create({
      title,
      description,
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
      youtubeVideoId,
      youtubeUrl,
      artistId,
    });

    res.status(201).json({ success: true, course: newCourse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { uploadCourse };

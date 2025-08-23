const Post = require("../models/PostCreator");

const createPost = async (req, res) => {
  try {
    const { title, description, story, tags } = req.body;

    if (!req.file) return res.status(400).json({ error: "Photo is required" });
    if (!title || !description || !story) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const post = new Post({
      photoUrl: `/upload/${req.file.filename}`,
      title,
      description,
      story,
      tags: JSON.parse(tags), // comes as string from frontend
    });

    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createPost, getPosts ,getPostById};

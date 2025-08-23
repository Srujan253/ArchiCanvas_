const express = require("express");
const { createPost, getPosts,getPostById } = require("../controllers/PostCreator");
const upload = require("../middleware/multur");

const router = express.Router();

router.get("/", getPosts);

router.get("/:id", getPostById);
router.post("/", upload.single("photo"), createPost);

module.exports = router;

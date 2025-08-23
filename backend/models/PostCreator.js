const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    photoUrl: { type: String, required: true },
    title: { type: String, required: true, maxlength: 100 },
    description: { type: String, required: true, maxlength: 300 },
    story: { type: String, required: true, maxlength: 500 },
    tags: [{ type: String, required: true }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);

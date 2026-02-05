const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  username: String,
  text: String,
  image: String,
  likes: [String],
  comments: [
    {
      username: String,
      text: String,
      createdAt: Date
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);

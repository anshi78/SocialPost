const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  const { userId, username, text, image } = req.body;
  if (!text && !image) {
    return res.status(400).json({ message: "Post cannot be empty" });
  }
  const post = await Post.create({
    userId, username, text, image, likes: [], comments: []
  });
  res.json(post);
};

exports.getPosts = async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
};

exports.likePost = async (req, res) => {
  const { username } = req.body;
  const post = await Post.findById(req.params.id);
  if (!post.likes.includes(username)) {
    post.likes.push(username);
    await post.save();
  }
  res.json(post);
};

exports.commentPost = async (req, res) => {
  const { username, text } = req.body;
  const post = await Post.findById(req.params.id);
  post.comments.push({ username, text, createdAt: new Date() });
  await post.save();
  res.json(post);
};

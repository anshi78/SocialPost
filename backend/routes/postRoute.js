const router = require("express").Router();
const {
  createPost, getPosts, likePost, commentPost
} = require("../controllers/postController");

router.post("/", createPost);
router.get("/", getPosts);
router.put("/:id/like", likePost);
router.post("/:id/comment", commentPost);

module.exports = router;

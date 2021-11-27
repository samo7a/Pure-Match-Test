const express = require("express");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const { uploadImage } = require("../config/AWSs3");
const { authenicateUser } = require("../config/jwt");
const multer = require("multer");
const upload = multer({ dest: "./uploads/" });
const router = express.Router();
const { timeSince } = require("../config/misc");

router.post(
  "/create",
  authenicateUser,
  upload.array("images", 5),
  async (req, res) => {
    const { title, description, uid } = req.body;
    const files = req.files;
    var photo_urls = [];
    try {
      for (let file of files) {
        const result = await uploadImage(file);
        photo_urls.push(result.Location);
      }
      var photos = "{";
      for (let photo of photo_urls) {
        photos += `${photo} ,`;
      }
      photos = photos.substring(0, photos.length - 1);
      photos += "}";
      console.log(photos);
      const post = await Post.create({
        title,
        description,
        photo_urls,
        uid,
      });
      res.status(200).json({
        error: false,
        message: "Post created successfully",
        post,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: true,
        message: "Error Creating Post: " + error.message,
      });
    }
  }
);

router.get("/posts", authenicateUser, async (req, res) => {
  const { uid, page } = req.body;
  const limit = 2;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = {};

  try {
    const count = await Post.count({
      where: { uid: uid },
    });
    if (endIndex < count) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    const posts = await Post.findAll({
      offset: startIndex,
      limit: limit,
      where: { uid: uid },
    });
    var posts_array = [];
    for (let post of posts) {
      const post_id = post.post_id;
      const comments = await Comment.findAll({ where: { post_id: post_id } });
      const time = timeSince(post.createdAt);
      const obj = {
        post_id,
        title: post.title,
        description: post.description,
        photo_url: post.photo_url,
        uid: post.uid,
        createdAt: post.createdAt,
        timeSinceCreated: time,
        comments,
      };
      posts_array.push(obj);
    }
    results.posts = posts_array;
    res.status(200).json({
      error: false,
      message: "Posts fetched successfully",
      results,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: "Error fetching posts: " + error.message,
    });
  }
});

router.post("/edit", authenicateUser, async (req, res) => {
  const { title, description, post_id } = req.body;
  try {
    const post = await Post.findOne({ where: { post_id: post_id } });
    if (title) post.title = title;
    if (description) post.description = description;
    await post.save();
    res.status(200).json({
      error: false,
      message: "Post edited successfully",
      post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: "Error fetching post: " + error.message,
    });
  }
});
module.exports = router;

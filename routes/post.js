const express = require("express");
const Post = require("../models/Post");
// const  timeSince  = require("../models/Post");
const { hashPassword, comparePassword } = require("../config/auth");
const { uploadImage } = require("../config/AWSs3");
const fs = require("fs");
const util = require("util");
const unlink = util.promisify(fs.unlink);

const { authenicateUser } = require("../config/jwt");
const multer = require("multer");
const { route } = require("./user");
const upload = multer({ dest: "./uploads/" });
const router = express.Router();
const timeSince = (date) => {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
};

router.post(
  "/create",
  authenicateUser,
  // upload.single("image"),
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
      // await unlink(file.path);
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

router.get("/", authenicateUser, async (req, res) => {
  const { uid } = req.body;
  try {
    const posts = await Post.findAll({
      where: { uid: uid },
    });
    var posts_array = [];
    for (let post of posts) {
      const time = timeSince(post.createdAt);
      const obj = {
        post_id: post.post_id,
        title: post.title,
        description: post.description,
        photo_url: post.photo_url,
        uid: post.uid,
        createdAt: post.createdAt,
        timeSinceCreated: time,
      };
      posts_array.push(obj);
    }
    res.status(200).json({
      error: false,
      message: "Posts fetched successfully",
      posts: posts_array,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: "Error fetching posts: " + error.message,
    });
  }
});
module.exports = router;

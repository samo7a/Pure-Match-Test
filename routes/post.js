const express = require("express");
const Post = require("../models/Post");
const { hashPassword, comparePassword } = require("../config/auth");
const { uploadImage } = require("../config/AWSs3");
const fs = require("fs");
const util = require("util");
const unlink = util.promisify(fs.unlink);

const { authenicateUser } = require("../config/jwt");
const multer = require("multer");
const upload = multer({ dest: "./uploads/" });
const router = express.Router();

router.post(
  "/create",
  authenicateUser,
  upload.single("image"),
  async (req, res) => {
    const { title, description, uid } = req.body;
    const file = req.file;
    let photo_url;
    try {
      const result = await uploadImage(file);
      photo_url = result.Location;
      const post = await Post.create({
        title,
        description,
        photo_url,
        uid,
      });
      await unlink(file.path);
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
module.exports = router;

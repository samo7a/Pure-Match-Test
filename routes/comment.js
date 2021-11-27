const express = require("express");
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const { authenicateUser } = require("../config/jwt");
const router = express.Router();

router.post("/add", authenicateUser, async (req, res) => {
  const { uid, post_id, content } = req.body;
  try {
    const comment = await Comment.create({
      uid,
      post_id,
      content,
    });

    res.status(200).send({
      error: true,
      msg: `Comment Added Successfully.`,
      comment,
    });
  } catch (e) {
    res.status(500).send({
      error: true,
      msg: `Error adding a comment: ${e}`,
    });
  }
});
module.exports = router;

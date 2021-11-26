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

router.post("/create", upload.single("image"), async (req, res) => {
  // res.send("create");
  const file = req.file;
  console.log(file);
  const result = await uploadImage(file);
  await unlink(file.path);
  const url = result.Location;
  console.log(url);
  res.send("create");
});
module.exports = router;

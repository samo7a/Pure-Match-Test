const express = require("express");
const User = require("../models/User");
const { hashPassword, comparePassword } = require("../config/auth");
const { createToken, createRefreshToken } = require("../config/jwt");
const router = express.Router();

router.post("/register", async (req, res) => {
  console.log("register");
  const { name, email, password } = req.body;
  const hashedPassword = await hashPassword(password);
  const obj = {
    name: name,
    email: email,
    password: hashedPassword,
  };
  console.log(obj);
  try {
    const user = await User.create(obj);
    res.status(200).json({ success: true, msg: "User registered", user: user });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Failed to register user",
      err: err.message,
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(401).json({
        success: false,
        msg: "Wrong Email/Password Pair!",
      });
    }

    const match = comparePassword(password, user.password);
    if (!match) {
      return res.status(401).json({
        success: false,
        msg: "Wrong Email/Password Pair!",
      });
    }
    const token = createToken(user);
    const refreshToken = createRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save();
    res.status(200).json({
      success: true,
      msg: "User logged in",
      user: user,
      token: token,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err,
    });
  }
});

router.post("/logout", async (req, res) => {
  const { uid, refreshToken } = req.body;
  try {
    const user = await User.findOne({
      where: { uid: uid, refreshToken: refreshToken },
    });
    if (!user) {
      return res.status(401).json({
        success: false,
        msg: "No user with this refresh token",
      });
    }
    user.refreshToken = null;
    await user.save();
    res.status(200).json({
      success: true,
      msg: "User logged out",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err,
    });
  }
});

module.exports = router;

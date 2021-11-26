const jwt = require("jsonwebtoken");
require("dotenv").config();

const createToken = (user) => {
  return jwt.sign(
    {
      uid: user.uid,
      email: user.email,
      name: user.name,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );
};

const createRefreshToken = (user) => {
  return jwt.sign(
    {
      uid: user.uid,
      email: user.email,
      name: user.name,
    },
    process.env.REFRESH_TOKEN_SECRET
  );
};

const authenicateUser = (req, res, next) => {
  const header = req.headers["x-access-token"] || req.headers["authorization"];
  const token = header && header.split(" ")[1];
  if (!token)
    return res.status(403).json({
      error: true,
      message: "No token provided.",
    });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Failed to authenticate token.",
      });
    }
    req.user = user;
    next();
  });
};



exports.authenicateUser = authenicateUser;
exports.createToken = createToken;
exports.createRefreshToken = createRefreshToken;

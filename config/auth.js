const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (err) {
    throw new Error("Error hashing the password" + err);
  }
};

const comparePassword = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (err) {
    throw new Error(err);
  }
};

exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;

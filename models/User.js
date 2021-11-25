const sequelize = require("sequelize");
const db = require("../config/database");

const User = db.define("Users", {
  id: {
    type: sequelize.INTEGER,
  },
  name: {
    type: sequelize.STRING,
  },
  email: {
    type: sequelize.STRING,
  },
  password: {
    type: sequelize.STRING,
  },
});

module.exports = User;

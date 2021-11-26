const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const Post = db.define(
  "Posts",
  {
    post_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    photo_urls: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    uid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    createdAt: "createdAt",
    updatedAt: false,
  }
);

module.exports = Post;

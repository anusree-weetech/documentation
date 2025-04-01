const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "users", // Ensure table name matches MySQL
    timestamps: false, // Ensures createdAt & updatedAt fields dont exist
  }
);

module.exports = User;

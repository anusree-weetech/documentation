const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("testdb", "root", "", {
  host: "localhost",
  password: "yourpassword123*",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => console.log("Connected to MySQL"))
  .catch((err) => console.error("Connection error:", err));

module.exports = sequelize;

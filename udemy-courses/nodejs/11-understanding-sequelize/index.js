const sequelize = require("./database/db");
const User = require("./models/User");

// Sync database (Creates the table if not exists)
sequelize.sync().then(async () => {
  console.log("Database synced");

  // Insert a User
  const newUser = await User.create({
    name: "Sequelize example",
    email: "john@example.com",
  });
  console.log("User Created:", newUser.toJSON());

  // Fetch Users
  const users = await User.findAll();
  console.log(
    "All Users:",
    users.map((user) => user.toJSON())
  );
});

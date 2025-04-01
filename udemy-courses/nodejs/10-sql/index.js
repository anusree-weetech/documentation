const mysql = require("mysql2");
const express = require("express");
const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root", // Change if needed
  password: "yourpassword123*", // Your MySQL password
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL!");

  // Create database if not exists
  connection.query("CREATE DATABASE IF NOT EXISTS testdb", (err, result) => {
    if (err) throw err;
    console.log("Database 'testdb' is ready!");

    // Now use the database
    connection.changeUser({ database: "testdb" }, (err) => {
      if (err) throw err;
      console.log("Using database 'testdb'");
    });
  });
});

app.get("/create", () => {
  const createTable = `CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50),
        email VARCHAR(50)
      )`;

  connection.query(createTable, (err, result) => {
    if (err) throw err;
    console.log("Table created!");
  });
});

app.get("/insert", () => {
  const insertUser = `INSERT INTO users (name, email) VALUES ('John Doe', 'john@example.com')`;

  connection.query(insertUser, (err, result) => {
    if (err) throw err;
    console.log("User added!");
  });
});

app.get("/fetch", () => {
  connection.query("SELECT * FROM users", (err, results) => {
    if (err) throw err;
    console.log("Users:", results);
  });
});

app.get("/end", () => {
  connection.end().then(() => console.log("database connection stopped"));
});

app.listen(3000, () => {
  console.log("server listening on port 3000");
});

// password: yourpassword123*

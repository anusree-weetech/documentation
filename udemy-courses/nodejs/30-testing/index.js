// app.js
const express = require("express");
const app = express();

// A simple route to test
app.get("/hello", (req, res) => {
  res.status(200).json({ message: "Hello, world!" });
});

module.exports = app; // Export app for testing

// Mocha is used as the test framework.

// Chai is used for assertions.

// Supertest is used for making HTTP requests to your Express app in tests.

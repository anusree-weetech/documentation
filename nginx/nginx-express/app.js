// app.js
const express = require("express");
const app = express();
const PORT = process.argv[2] || 3000;

// Middleware for logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Basic route
app.get("/", (req, res) => {
  res.send(`Hello from Express port: ${PORT}`);
});

// Start the server (only for development)
// if (require.main === module) {
app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});
// }

// module.exports = app;  // Export the app for Nginx to use later

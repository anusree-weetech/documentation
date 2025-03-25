const express = require("express");
const app = express();
const PORT = process.argv[2] || 3000;

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.status(500).send(`500 error response`);
});
app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});

const express = require("express");
const app = express();
const PORT = process.argv[2] || 3000;

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.get("/rewrite-exercise", (req, res) => {
  res.send(`rewritten route`);
});

app.get("/", (req, res) => {
  res.send(`hello from express`);
});



app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});

const express = require("express");
const app = express();
const PORT = process.argv[2] || 3000;

app.use("/", (req, res) => {
  console.log("long request starting...");
  setTimeout(() => {
    res.send("long request ended");
  }, 20000);
});

app.listen(PORT, () => {
  console.log("server listeneing at", PORT);
});

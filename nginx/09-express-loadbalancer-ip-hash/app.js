const express = require("express");
const app = express();
const port = process.argv[2] || 3000;

app.use("/", (req, res) => {
    console.log('called port ', port)
  res.send(`hello from express port : ${port}`);
});

app.listen(port, () => {
  console.log("server listening on", port);
});

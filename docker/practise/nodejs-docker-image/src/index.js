const express = require("express");
const app = express();
app.use("/", (req, res) => {
  console.log("route called");
  res.send('docker route called')
});
app.listen(3000, () => {
  console.log("server is running on port 3000");
});

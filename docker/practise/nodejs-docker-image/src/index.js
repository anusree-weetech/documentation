const express = require("express");
const app = express();
app.use("/", (req, res) => {
  console.log("route called in replica:", process.env.APP_NAME);
  res.send("docker route called");
});

app.listen(3000, () => {
  console.log(process.env.APP_NAME, " is running on port 3000");
});

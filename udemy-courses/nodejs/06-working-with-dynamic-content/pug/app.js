const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "pug"); // Set Pug as the template engine
app.set("views", path.join(__dirname, "views"));

app.get("/user", (req, res) => {
    res.render("user", { name: "Alice", isAdmin: true, users:['apple', 'orange', 'mango'] });
});

app.get("/", (req, res) => {
  res.render("home", { title: "Welcome", message: "Hello, Pug!" });
});



app.listen(3000, () => {
  console.log("server is running on port 3000");
});

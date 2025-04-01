
const express = require("express");
const hbs = require("hbs");
const path = require("path");

const app = express();
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(__dirname + "/views/partials");


app.get("/", (req, res) => {
    res.render("home", { title: "Hello", message: "Welcome to Handlebars" });
});

app.listen(3000, () => {
    console.log("server is running on port 3000");
  });
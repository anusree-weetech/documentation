//flash messages re only while using templating engines. not for apps like react

const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");

const app = express();

// Middleware for session
app.use(
  session({
    secret: "my_secret_key", // Secret for signing the session ID
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set secure: true for HTTPS
  })
);

// Middleware for flash messages
app.use(flash());

// Middleware to pass flash messages to views (if using templates like EJS)
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success");
  res.locals.error_msg = req.flash("error");
  next();
});

// Example: Setting a flash message
app.get("/set-message", (req, res) => {
  req.flash("success", "Flash message set!");
  res.redirect("/show-message");
});

// Example: Displaying the flash message
app.get("/show-message", (req, res) => {
  res.send(req.flash("success")); // Flash message will be cleared after this request
});

app.listen(5000, () => console.log("Server running on port 5000"));

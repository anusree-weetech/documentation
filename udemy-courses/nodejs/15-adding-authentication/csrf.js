const express = require("express");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser()); // Required for CSRF with cookies

const csrfProtection = csrf({ cookie: true }); // Store token in a cookie
app.use(csrfProtection);

// Endpoint to send CSRF token to React
app.get("/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Example protected POST route
app.post("/submit", (req, res) => {
  res.json({ message: "Form submitted successfully!" });
});
// csrf middleware only enforces CSRF protection on "state-changing" methods (e.g., POST, PUT, DELETE, PATCH). so get routes are unprotected
app.listen(5000, () => console.log("Server running on port 5000"));

//another way is to store csrf in sessions so that we dont have to pass it to client
// const express = require("express");
// const session = require("express-session");
// const csrf = require("csurf");

// const app = express();
// app.use(express.json());
// app.use(
//   session({
//     secret: "your_secret_key", // Required for signing the session ID
//     resave: false,
//     saveUninitialized: true,
//   })
// );

// const csrfProtection = csrf({ sessionKey: "session" }); // Store CSRF token in session
// app.use(csrfProtection);

// app.get("/csrf-token", (req, res) => {
//   res.json({ csrfToken: req.csrfToken() });
// });

// app.post("/submit", (req, res) => {
//   res.json({ message: "Form submitted successfully!" });
// });

// app.listen(5000, () => console.log("Server running on port 5000"));



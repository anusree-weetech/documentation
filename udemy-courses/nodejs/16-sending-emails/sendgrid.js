require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sgMail = require("@sendgrid/mail");

const app = express();
app.use(cors()); // Allow requests from frontend
app.use(bodyParser.json());

// Set SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Email sending endpoint
app.post("/send-email", async (req, res) => {
  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const msg = {
    to,
    from: process.env.SENDER_EMAIL, // Must be a verified email in SendGrid
    subject,
    text,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ success: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));

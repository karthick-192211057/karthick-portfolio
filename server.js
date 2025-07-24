const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config(); // For using .env (e.g., email config)

const PORT = process.env.PORT || 3000;

// ✅ Serve static files from "public" folder
app.use(express.static(path.join(__dirname, "public")));

// ✅ Set view engine to EJS
app.set("view engine", "ejs");

// ✅ Middleware to parse form data (for contact form)
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.get("/", (req, res) => res.render("index"));
app.get("/about", (req, res) => res.render("about"));
app.get("/projects", (req, res) => res.render("projects"));
app.get("/research", (req, res) => res.render("research"));
app.get("/contact", (req, res) => res.render("contact"));

// ✅ Optional: POST route for contact form (if using nodemailer)
/*
const nodemailer = require("nodemailer");

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact from ${name}`,
      text: message,
    });
    res.send("Message sent successfully!");
  } catch (err) {
    console.error(err);
    res.send("Failed to send message.");
  }
});
*/

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

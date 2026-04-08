const express = require("express");
const serverless = require("serverless-http");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get("/", (req, res) => res.render("home"));
app.get("/about", (req, res) => res.render("about"));
app.get("/projects", (req, res) => res.render("projects"));
app.get("/research", (req, res) => res.render("research"));
app.get("/contact", (req, res) => res.render("contact"));

// Contact form POST
app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Message from ${name}`,
      text: message,
    });

    res.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = app;
module.exports.handler = serverless(app);

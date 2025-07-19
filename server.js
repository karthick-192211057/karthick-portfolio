// Load environment variables
require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
const { body, validationResult } = require("express-validator");

const app = express();
const PORT = process.env.PORT || 3000;

// Set view engine and static folder
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Routes for pages
app.get("/", (req, res) => res.render("index"));
app.get("/about", (req, res) => res.render("about"));
app.get("/projects", (req, res) => res.render("projects"));
app.get("/research", (req, res) => res.render("research"));
app.get("/contact", (req, res) => res.render("contact"));

// POST route for contact form
app.post(
  "/contact",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Enter a valid email"),
    body("message").notEmpty().withMessage("Message is required")
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send("Validation failed. Please enter valid details.");
    }

    const { name, email, message } = req.body;

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,  // From .env
        pass: process.env.EMAIL_PASS   // From .env (App Password)
      }
    });

    // Mail options
    const mailOptions = {
      from: email,
      to: "karthicksaravanan0703@gmail.com", // Where you want to receive messages
      subject: `Portfolio Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Mail send failed:", error);
        return res.status(500).send("Message failed to send.");
      }
      res.send("✅ Message sent successfully!");
    });
  }
);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

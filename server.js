require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
const { body, validationResult } = require("express-validator");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// ======================
// Middleware
// ======================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// ✅ Static files (IMPORTANT for Vercel)
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

// ======================
// Routes
// ======================

// GET routes
app.get("/", (req, res) => res.render("index"));
app.get("/about", (req, res) => res.render("about"));
app.get("/projects", (req, res) => res.render("projects"));
app.get("/research", (req, res) => res.render("research"));
app.get("/contact", (req, res) => res.render("contact"));

// ======================
// POST: Contact Form
// ======================
app.post(
  "/contact",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("message").notEmpty().withMessage("Message is required")
  ],
  async (req, res) => {
    try {
      // ✅ Check env variables first (VERY IMPORTANT)
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.log("⚠️ Email credentials not set");
        return res.send("Email service is not configured.");
      }

      // Validation check
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send("Invalid input data.");
      }

      const { name, email, message } = req.body;

      // Nodemailer setup
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      // Send mail
      await transporter.sendMail({
        from: process.env.EMAIL_USER, // ✅ safer than user input
        to: process.env.EMAIL_USER,
        subject: `Portfolio Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      });

      console.log("✅ Email sent successfully");
      res.send("✅ Message sent successfully!");
    } catch (err) {
      console.error("❌ Email Error:", err);
      res.status(500).send("❌ Something went wrong. Try again later.");
    }
  }
);

// ======================
// Global Error Handler
// ======================
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).send("Internal Server Error");
});

// ======================
// Run Locally
// ======================
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}

// ======================
// Export for Vercel
// ======================
module.exports = app;
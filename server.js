require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
const { body, validationResult } = require("express-validator");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// GET routes
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
    body("email").isEmail().withMessage("Valid email required"),
    body("message").notEmpty().withMessage("Message is required")
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation Errors:", errors.array());
      return res.status(400).send("❌ Invalid details submitted.");
    }

    const { name, email, message } = req.body;

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const mailOptions = {
        from: email,
        to: "karthicksaravanan0703@gmail.com",
        subject: `New Portfolio Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      };

      await transporter.sendMail(mailOptions);
      console.log("✅ Email sent successfully.");
      res.send("✅ Message sent successfully!");
    } catch (err) {
      console.error("❌ Email failed:", err.message);
      res.status(500).send("❌ Failed to send message. Try again later.");
    }
  }
);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

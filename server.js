require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
const { body, validationResult } = require("express-validator");
const path = require("path"); // ✅ ADD THIS

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.set("view engine", "ejs");

// ✅ FIX STATIC PATH (IMPORTANT)
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

// GET routes
app.get("/", (req, res) => res.render("index"));
app.get("/about", (req, res) => res.render("about"));
app.get("/projects", (req, res) => res.render("projects"));
app.get("/research", (req, res) => res.render("research"));
app.get("/contact", (req, res) => res.render("contact"));
const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Static credentials
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin";

// Login route
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Generate a JWT token
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

module.exports = router;
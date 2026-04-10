const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("./User");
const { protect } = require("./authMiddleware");

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// POST register
router.post("/register", async (req, res) => {
  try {
    console.log("Incoming body:", req.body); // ⭐ DEBUG

    let { name, firstName, lastName, email, password } = req.body;

    // 🔥 FORCE NAME CREATION
    if (!name) {
      name = `${firstName || ""} ${lastName || ""}`.trim();
    }

    // ❌ Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // ❌ Check existing user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // ✅ Create user (NO manual hashing if model hashes)
    const user = await User.create({
      name,
      email,
      password,
    });

    // ✅ Response
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: require("jsonwebtoken").sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      ),
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error); // ⭐ IMPORTANT
    res.status(500).json({ message: error.message }); // ⭐ SHOW REAL ERROR
  }
});

// POST login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET current user profile
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
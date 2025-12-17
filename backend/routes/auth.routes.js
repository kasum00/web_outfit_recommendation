const express = require("express");
const router = express.Router();
const { signup, login } = require("../services/auth.service");

/* ===== SIGN UP ===== */
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match");
    }

    await signup({ username, email, password });

    // ✅ XONG SIGN UP → SANG SETUP PROFILE
    return res.redirect("/pages/setup-profile.html");

  } catch (err) {
    return res.status(400).send(err.message);
  }
});


/* ===== LOGIN ===== */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await login({ email, password });

    // ❗ chỉ login nếu profile đã xong
    if (!user.is_profile_completed) {
      return res.redirect("/pages/setup-profile.html");
    }

    // ✅ LOGIN THẬT
    req.session.userId = user.id;

    return res.redirect("/pages/dashboard.html");

  } catch (err) {
    return res.status(401).send(err.message);
  }
});

const User = require("../models/User");

/* ===== GET CURRENT USER ===== */
router.get("/me", async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Not logged in" });
  }

  const user = await User.findByPk(req.session.userId, {
    attributes: ["username", "email"],
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.json(user);
});

module.exports = router;

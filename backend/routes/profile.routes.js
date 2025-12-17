const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/setup", async (req, res) => {
  try {
    // 👉 LẤY USER VỪA SIGNUP
    const user = await User.findOne({
      order: [["id", "DESC"]],
    });

    if (!user) {
      return res.send("User not found");
    }

    const { gender, height, style } = req.body;

    user.gender = gender;
    user.height = height;
    user.style = style;
    user.is_profile_completed = true;

    await user.save();

    return res.redirect("/pages/index.html");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Setup profile failed");
  }
});

module.exports = router;

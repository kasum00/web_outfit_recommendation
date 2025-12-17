const User = require("../models/User");

async function setupProfile(userId, { gender, height, style }) {
  const user = await User.findByPk(userId);
  if (!user) throw new Error("User not found");

  user.gender = gender;
  user.height = height;
  user.style = style;
  user.is_profile_completed = true;

  await user.save();
  return user;
}

module.exports = { setupProfile };

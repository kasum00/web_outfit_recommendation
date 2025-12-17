const bcrypt = require("bcrypt");
const User = require("../models/User");

async function signup({ username, email, password }) {
  const exist = await User.findOne({ where: { email } });
  if (exist) throw new Error("Email already exists");

  const hashed = await bcrypt.hash(password, 10);

  return await User.create({
    username,
    email,
    password: hashed,
    is_profile_completed: false,
  });
}

async function login({ email, password }) {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("User not found");

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw new Error("Wrong password");

  return user;
}

module.exports = { signup, login };

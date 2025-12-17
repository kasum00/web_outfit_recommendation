const { signup, login } = require("./auth.service");
const { setupProfile } = require("./profile.service");

async function fullAuthFlow() {
  // 1️⃣ Signup
  const user = await signup({
    username: "flowuser",
    email: "flow@gmail.com",
    password: "123456",
  });

  console.log("Signup OK:", user.email);

  // 2️⃣ Login
  const loginResult = await login({
    email: "flow@gmail.com",
    password: "123456",
  });

  console.log("Login OK:", loginResult);

  // 3️⃣ Setup profile nếu chưa hoàn thành
  if (!loginResult.is_profile_completed) {
    const profileResult = await setupProfile(loginResult.id, {
      gender: "male",
      height: 170,
      style: "street",
    });

    console.log("Profile completed:", profileResult);
  }
}

module.exports = {
  fullAuthFlow,
};

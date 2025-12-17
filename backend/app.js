const express = require("express");
const session = require("express-session");
const path = require("path");
const sequelize = require("./config/database");

const authRoutes = require("./routes/auth.routes");
const profileRoutes = require("./routes/profile.routes");

const app = express();

/* ================= BODY PARSER ================= */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* ================= SESSION ================= */
app.use(
  session({
    secret: "or_site_secret",
    resave: false,
    saveUninitialized: false,
  })
);

/* ================= STATIC FRONTEND ================= */
/*
  Cấu trúc project:
  web_outfit_recommendation-main/
    ├─ backend/
    ├─ pages/
    ├─ css/
    ├─ img/
*/
app.use(express.static(path.join(__dirname, "..")));

/* ================= ROUTES ================= */
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

/* ================= START SERVER ================= */
const PORT = 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      console.log(`➡️ Home: http://localhost:${PORT}/pages/index.html`);
    });
  } catch (err) {
    console.error("❌ Cannot start server:", err);
  }
})();

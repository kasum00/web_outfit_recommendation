const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "or_site",
  "app_user",
  "app123456",
  {
    host: "localhost",
    dialect: "mysql",
    logging: false,
  }
);

module.exports = sequelize;

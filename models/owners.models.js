const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Owners = sequelize.define(
  "owners",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    full_name: {
      type: DataTypes.STRING(30),
    },
    phone_number: {
      type: DataTypes.STRING(15),
      validate: {
        is: /^\d{2}-\d{3}-\d{2}-\d{2}$/,
      },
    },
    email: {
      type: DataTypes.STRING(300),
    },
    password: {
        type: DataTypes.STRING
    },
    refresh_token: {
      type: DataTypes.STRING(500),
    },
    activation_link:{
      type: DataTypes.STRING,
    },
    organization_name: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Owners

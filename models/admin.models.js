const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Regions = require("./region.models");

const Admins = sequelize.define(
  "admin",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    full_name: {
      type: DataTypes.STRING(30),
    },
    email: {
      type: DataTypes.STRING(30),
      unique: true,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    phone_number: {
      type: DataTypes.STRING(15),
      validate: {
        is: /^\d{2}-\d{3}-\d{2}-\d{2}$/,
      },
    },
    assigned_region_id: {
      type: DataTypes.INTEGER,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    refresh_token: {
      type: DataTypes.STRING(255),
    },
    is_creater: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// Admins.belongsTo(Regions)
// Regions.hasMany(Admins)

module.exports = Admins;

const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Products = require("./products.models");

const DeviceLogs = sequelize.define(
  "devicelogs",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
    },
    log_date: {
      type: DataTypes.DATE,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

DeviceLogs.belongsTo(Products)
Products.hasMany(DeviceLogs)

module.exports = DeviceLogs;

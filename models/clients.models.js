const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Regions = require("./region.models");

const Clients = sequelize.define(
  "clients",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING(30),
    },
    last_name: {
      type: DataTypes.STRING(30),
    },
    phone: {
      type: DataTypes.STRING(15),
      validate: {
        is: /^\d{2}-\d{3}-\d{2}-\d{2}$/,
      },
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    region_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "regions",
        key: "id",
      },
    },
    address: {
      type: DataTypes.STRING(255),
    },
    password_series: {
      type: DataTypes.STRING(10),
    },
    password_selfie: {
      type: DataTypes.STRING,
    },
    refresh_token: {
      type: DataTypes.STRING(500),
    },
    activation_link: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Clients.belongsTo(Regions, {
  foreignKey: "region_id",
});
Regions.hasMany(Clients, {
  foreignKey: "region_id",
});

// Clients.belongsTo(Regions)
// Regions.hasMany(Clients)

module.exports = Clients;

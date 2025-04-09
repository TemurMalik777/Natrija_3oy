const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Owners = require("./owners.models");
const Categories = require("./categories.models");

const Products = sequelize.define(
  "products",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    owner_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "owners",
        key: "id",
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    manufacture_year: {
      type: DataTypes.INTEGER,
    },
    price_per_day: {
      type: DataTypes.DECIMAL,
    },
    is_available: {
      type: DataTypes.BOOLEAN,
    },
    location: {
      type: DataTypes.TEXT,
    },
    image_url: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Products.belongsTo(Owners, { foreignKey: "owner_id" });
Owners.hasMany(Products, { foreignKey: "owner_id" });


Products.belongsTo(Categories, { foreignKey: "category_id" });
Categories.hasMany(Products, { foreignKey: "category_id" });

module.exports = Products;

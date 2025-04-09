const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Owners = require("./owners.models");
const Contracts = require("./contracts.models");
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
      references: {
        model: "categories",
        key: "id",
      },
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

Products.belongsTo(Owners);
Owners.hasMany(Products);

Products.belongsTo(Contracts);
Contracts.hasMany(Products);

Products.belongsTo(Categories);
Categories.hasMany(Products);

module.exports = Products;

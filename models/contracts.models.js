const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Clients = require("./clients.models");
const Status = require("./status.models");
const Products = require("./products.models");
const Owners = require("./owners.models");

const Contracts = sequelize.define(
  "contracts",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    start_date: {
      type: DataTypes.DATE,
    },
    end_date: {
      type: DataTypes.DATE,
    },
    total_price: {
      type: DataTypes.DECIMAL,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Contracts.belongsTo(Clients);
Clients.hasMany(Contracts);

Contracts.belongsTo(Status);
Status.hasMany(Contracts);

Contracts.belongsTo(Products);
Products.hasMany(Contracts);

Contracts.belongsTo(Owners)
Owners.hasMany(Contracts)

module.exports = Contracts;

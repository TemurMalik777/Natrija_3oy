const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Clients = require("./clients.models");
const Status = require("./status.models");
const Products = require("./products.models");

const Contracts = sequelize.define(
  "contracts",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      // references: {
      //   model: "products",
      //   key: "id",
      // },
    },
    client_id: {
      type: DataTypes.INTEGER,
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
    status_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "status",
        key: "id",
      },
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

Contracts.belongsTo(Products, { foreignKey: "contract_id" });
Products.hasMany(Contracts, { foreignKey: "contract_id" });

module.exports = Contracts;

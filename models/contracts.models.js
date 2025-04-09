const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Clients = require("./clients.models");
const Status = require("./status.models");

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
      references: {
        model: "clients",
        key: "id",
      },
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

module.exports = Contracts;

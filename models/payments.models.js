const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Contracts = require("./contracts.models");
const Clients = require("./clients.models");

const Payments = sequelize.define("payments", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: {
    type: DataTypes.DECIMAL,
  },
  payment_date: {
    type: DataTypes.DATE,
  },
  method: {
    type: DataTypes.STRING,
  },
});

Payments.belongsTo(Contracts);
Contracts.hasMany(Payments);

Payments.belongsTo(Clients)
Clients.hasMany(Payments)

// Payments.belongsTo(Contracts, { foreignKey: "contract_id", as: "contract" });
// Contracts.hasMany(Payments, { foreignKey: "contract_id" });

module.exports = Payments;

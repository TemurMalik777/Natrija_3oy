const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const OTP = sequelize.define("otp", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
    }
},
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = OTP;

const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../services/dbService');

class TransactionType extends Model { }

TransactionType.init({
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.STRING,
        notEmpty: true,
        allowNull: false
    },
    nature: {
        type: DataTypes.STRING,
        notEmpty: true,
        allowNull: false,
        validate: {
            is: "Entrada" || "Saída"
        }
    },
    symbol: {
        type: DataTypes.STRING,
        notEmpty: true,
        allowNull: false,
        validate: {
            is: "+" || "-"
        }
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date()
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date()
    }
}, {
    sequelize, // We need to pass the connection instance
    modelName: 'TransactionType' // We need to choose the model name
});

module.exports = TransactionType;
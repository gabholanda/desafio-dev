'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class TransactionType extends Model {
        static associate(models) {
            // define association here
        }
    }
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
    return TransactionType;
};
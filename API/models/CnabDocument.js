const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../services/dbService');
const { cpf } = require('cpf-cnpj-validator');

class CnabDocument extends Model {

    static associate(models) {
        CnabDocument.belongsTo(models.TransactionType);
    }
}

CnabDocument.init({
    ocurrenceDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    value: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    CPF: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
        validate: {
            validateCPF: (value) => {
                const isNotValid = !cpf.isValid(value)
                if (isNotValid) {
                    throw new Error("This CPF is not valid: " + value);
                }
            }
        }
    },
    card: {
        type: DataTypes.STRING,
        notEmpty: true,
        allowNull: false
    },
    hour: {
        type: DataTypes.STRING,
        notEmpty: true,
        allowNull: false
    },
    shopOwner: {
        type: DataTypes.STRING,
        notEmpty: true,
        allowNull: false
    },
    shopName: {
        type: DataTypes.STRING,
        notEmpty: true,
        allowNull: false
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
    modelName: 'CnabDocument' // We need to choose the model name
});

module.exports = CnabDocument;
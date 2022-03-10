'use strict';
const { DataTypes } = require('sequelize');
const { cpf } = require('cpf-cnpj-validator');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CnabDocuments', {
      id: {
        type: DataTypes.STRING,
        unique: true,
        primaryKey: true
      },
      TransactionTypeId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'TransactionTypes',
          key: 'id'
        }
      },
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CnabDocuments');
  }
};
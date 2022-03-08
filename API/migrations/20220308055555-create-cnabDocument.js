'use strict';
const { DataTypes } = require('sequelize');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CnabDocuments', {
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CnabDocuments');
  }
};
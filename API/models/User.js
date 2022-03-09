const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../services/dbService');

class User extends Model { }

User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
    }
}, {
    sequelize, // We need to pass the connection instance
    modelName: 'User' // We need to choose the model name
});

module.exports = User;
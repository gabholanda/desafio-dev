const { Sequelize } = require('sequelize');
const host = process.env.HOST;
const username = process.env.USER;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;
const dialect = process.env.DB_DIALECT;
const port = process.env.DB_PORT;

const sequelize = new Sequelize(database, username, password, {
    host,
    dialect: dialect, /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    port
});

connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = { connectDatabase, sequelize };
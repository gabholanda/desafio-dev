const { Sequelize } = require('sequelize');
const host = process.env.HOST;
const username = process.env.USER;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;
const dialect = process.env.DB_DIALECT || "postgres";
const port = process.env.DB_PORT;

const sequelize = new Sequelize(database, username, password, {
    host,
    dialect: dialect, /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    port
});

connectDatabase = async () => {
    let retries = 10;
    while (retries)
        try {
            // await sequelize.authenticate();
            await sequelize.sync();
            console.log('Connection has been established successfully.');
            break;
        } catch (error) {
            console.error(error);
            console.log(`Retries left: ${retries}`);
            retries -= 1;
            await new Promise((res) => setTimeout(res, 5000));
        }
}

module.exports = { connectDatabase, sequelize };
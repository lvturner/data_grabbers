let host = process.env.DB_HOST;
let db = process.env.DB_NAME;
let username = process.env.DB_USER;
let password = process.env.DB_PASSWORD;
const Sequelize = require('sequelize');
const sequelize = new Sequelize(db, username, password, {
    host: host,
    dialect: 'mysql',
    operatorsAliases: false,
    logging: true,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

module.exports = sequelize;
const Sequelize = require('sequelize');
module.exports = (db) => {
    return db.define('stocktwits_sentiment',{
        bullish: {
            type: Sequelize.FLOAT
        },
        bearish: {
            type: Sequelize.FLOAT
        },
        timestamp: {
            type: Sequelize.DATE,
            primaryKey: true
        }
    });
};

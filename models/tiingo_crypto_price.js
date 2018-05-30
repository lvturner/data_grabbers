const Sequelize = require('sequelize');
module.exports = (db) => {
    return db.define('tiingo_crypto_price',{
        // might need to get smarter with this id
        ticker: {
            type: Sequelize.STRING
        },
        baseCurrency: {
            type: Sequelize.STRING
        },
        quoteCurrency: {
            type: Sequelize.STRING
        },
        tradesDone: {
            type: Sequelize.FLOAT
        },
        open: {
            type: Sequelize.FLOAT
        },
        high: {
            type: Sequelize.FLOAT
        },
        low: {
            type: Sequelize.FLOAT
        },
        close: {
            type: Sequelize.FLOAT
        },
        volumeNotational: {
            type: Sequelize.FLOAT // we just store the ticker array as JSON, will need to deserlize it in code
        },
        volume: {
            type: Sequelize.FLOAT // we just store the ticker array as JSON, will need to deserlize it in code
        },
        date: {
            type: Sequelize.DATE,
            primaryKey: true
        }
    });
};

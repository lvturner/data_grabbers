const Sequelize = require('sequelize');
module.exports = (db) => {
    return db.define('coin_market_cap_item',{
        // might need to get smarter with this id
        coin_id: {
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING
        },
        symbol: {
            type: Sequelize.STRING
        },
        website_slug: {
            type: Sequelize.STRING
        },
        rank: {
            type: Sequelize.INTEGER
        },
        circulating_supply: {
            type: Sequelize.FLOAT
        },
        total_supply: {
            type: Sequelize.FLOAT
        },
        max_supply: {
            type: Sequelize.FLOAT
        },
        quote_usd_price: {
            type: Sequelize.FLOAT
        },
        quote_usd_volume_24h: {
            type: Sequelize.FLOAT
        },
        quote_usd_market_cap: {
            type: Sequelize.FLOAT
        },
        quote_usd_percent_change_1h: {
            type: Sequelize.FLOAT
        },
        quote_usd_percent_change_24h: {
            type: Sequelize.FLOAT
        },
        quote_usd_percent_change_7d: {
            type: Sequelize.FLOAT
        },
        last_updated: {
            type: Sequelize.INTEGER
        },
        timestamp: {
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    });
};

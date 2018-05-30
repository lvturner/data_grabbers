const Sequelize = require('sequelize');
module.exports = (db) => {
    return db.define('blockchain_info_item',{
        market_price_usd: {
            type: Sequelize.FLOAT
        },
        hash_rate: {
            type: Sequelize.FLOAT
        },
        total_fees_btc: {
            type: Sequelize.BIGINT
        },
        n_btc_mined: {
            type: Sequelize.BIGINT
        },
        n_tx: {
            type: Sequelize.INTEGER
        },
        n_blocks_mined: {
            type: Sequelize.INTEGER
        },
        minutes_between_blocks: {
            type: Sequelize.FLOAT
        },
        totalbc: {
            type: Sequelize.BIGINT
        },
        n_blocks_total:  {
            type: Sequelize.INTEGER
        },
        estimated_transaction_volume_usd: {
            type: Sequelize.FLOAT
        },
        blocks_size:  {
            type: Sequelize.INTEGER
        },
        miners_revenue_usd: {
            type: Sequelize.FLOAT
        },
        nextretarget: {
            type: Sequelize.INTEGER
        },
        difficulty: {
            type: Sequelize.BIGINT
        },
        estimated_btc_sent: {
            type: Sequelize.BIGINT
        },
        miners_revenue_btc: {
            type: Sequelize.INTEGER
        },
        total_btc_sent: {
            type: Sequelize.BIGINT
        },
        trade_volume_btc: {
            type: Sequelize.FLOAT
        },
        trade_volume_usd: {
            type: Sequelize.FLOAT
        },
        timestamp: {
            type: Sequelize.BIGINT,
            primaryKey: true
        }
    });
};

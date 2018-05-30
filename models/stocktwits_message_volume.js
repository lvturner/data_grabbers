const Sequelize = require('sequelize');
module.exports = (db) => {
    return db.define('stocktwits_message_volume',{
        volume_change: {
            type: Sequelize.FLOAT
        },
        volume_score: {
            type: Sequelize.FLOAT
        },
        timestamp: {
            type: Sequelize.DATE,
            primaryKey: true
        }
    });
};

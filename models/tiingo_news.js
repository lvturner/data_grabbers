const Sequelize = require('sequelize');
module.exports = (db) => {
    return db.define('tiingo_news_item',{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING
        },
        URL: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT
        },
        publishedDate: {
            type: Sequelize.DATE
        },
        crawlDate: {
            type: Sequelize.DATE
        },
        tickers: {
            type: Sequelize.TEXT // we just store the ticker array as JSON, will need to deserlize it in code
        },
        tags: {
            type: Sequelize.TEXT // we just store the ticker array as JSON, will need to deserlize it in code
        },
        newsSource: {
            type: Sequelize.STRING
        }
    });
};

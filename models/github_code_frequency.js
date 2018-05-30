const Sequelize = require('sequelize');
module.exports = (db) => {
    return db.define('github_code_frequency',{
        additions: {
            type: Sequelize.INTEGER
        },
        deletions: {
            type: Sequelize.INTEGER
        },
        timestamp: {
            type: Sequelize.DATE,
            primaryKey: true
        }
    });
};

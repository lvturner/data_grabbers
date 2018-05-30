const BlockChainInfoModel = require('../models/blockchain_info');
const rp = require('request-promise');
const Promise = require('bluebird');
class BlockChainInfo {
    constructor(db) {
        this.blockchain_info = BlockChainInfoModel(db);
    }

    // note could modify in the future to also take tags
    beginImport() {
        console.log("Begining import of blockchain info");
        return this.blockchain_info.sync().then(() => { return this._importData(); });
    }
    _importData() {
        let options = {
            uri: 'https://api.blockchain.info/stats',
            json: true
        };
        return rp(options).then((data) => {
            return this._storeData.bind(this)(data);
        });
    }

    _storeData(data) {
        return this.blockchain_info.upsert({
            market_price_usd: data.market_price_usd,
            hash_rate: data.hash_rate,
            total_fees_btc: data.total_fees_btc,
            n_btc_mined: data.n_btc_mined,
            n_tx: data.n_tx,
            n_blocks_mined: data.n_blocks_mined,
            minutes_between_blocks: data.minutes_between_blocks,
            totalbc: data.totalbc,
            n_blocks_total: data.n_blocks_total,
            estimated_transaction_volume_usd: data.estimated_transaction_volume_usd,
            blocks_size: data.blocks_size,
            miners_revenue_usd: data.miners_revenue_usd,
            nextretarget: data.nextretarget,
            difficulty: data.difficulty,
            estimated_btc_sent: data.estimated_btc_sent,
            miners_revenue_btc: data.miners_revenue_btc,
            total_btc_sent: data.total_btc_sent,
            trade_volume_btc: data.trade_volume_btc,
            trade_volume_usd: data.trade_volume_usd,
            timestamp: data.timestamp
        });
    }

}

module.exports = BlockChainInfo;
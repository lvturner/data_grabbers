const CoinMarketCapModel = require('../models/coin_market_cap');
const rp = require('request-promise');
const Promise = require('bluebird');
class CoinMarketCap {
    constructor(db) {
        this.coin_market_cap_model = CoinMarketCapModel(db);
    }

    setTicker(ticker) {
        this.ticker = ticker;
    }
    beginImport() {
        return this.coin_market_cap_model.sync().then(() => { return this._importData(); });
    }
    _importData() {
        let options = {
            uri: 'https://api.coinmarketcap.com/v2/ticker/' + this.ticker,
            json: true
        };
        return rp(options).then((data) => { return this._storeData.bind(this)(data); })
            .catch((err) => {
                console.error(err);
            })
    }

    _storeData(data) {
        let item = data.data;
        let quotes = item.quotes.USD;
        let timestamp = data.metadata.timestamp;
        return this.coin_market_cap_model.upsert({
            coin_id: item.id,
            name: item.name,
            symbol: item.symbol,
            website_slug: item.website_slug,
            rank: item.rank,
            circulating_supply: item.circulating_supply,
            total_supply: item.total_supply,
            max_supply: item.max_supply,
            quote_usd_price: quotes.price,
            quote_usd_volume_24h: quotes.volume_24h,
            quote_usd_market_cap: quotes.market_cap,
            quote_usd_percent_change_1h: quotes.percent_change_1h,
            quote_usd_percent_change_24h: quotes.percent_change_24h,
            quote_usd_percent_change_7d: quotes.percent_change_7d,
            last_updated: item.last_updated,
            timestamp: timestamp
        });
    }
}

module.exports = CoinMarketCap;
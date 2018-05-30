const StockTwitsSentimentModel = require('../models/stocktwits_sentiment');
const rp = require('request-promise');
const Promise = require('bluebird');
class StockTwitsSentiment {
    constructor(db) {
        this.stocktwits_sentiment = StockTwitsSentimentModel(db);
    }

    setTicker(ticker) {
        this.ticker = ticker;
    }
    beginImport() {
        return this.stocktwits_sentiment.sync().then(() => { return this._importData(); });
    }
    _importData() {
        let options = {
            uri: 'https://api.stocktwits.com/api/2/symbols/' + this.ticker + '/sentiment.json',
            json: true
        };
        return rp(options).then((data) => { return this._storeData.bind(this)(data); })
            .catch((err) => {
                console.error(err);
            })
    }

    _storeData(data) {
        let items = data.data;
        let promises = [];
        for(let x = 0;x < items.length; x++) {
            let item = items[x];
            promises.push(
                this.stocktwits_sentiment.upsert({
                    bullish: item.bullish,
                    bearish: item.bearish,
                    timestamp: item.timestamp
                })
            )
        }

        return Promise.all(promises);
    }

}

module.exports = StockTwitsSentiment;
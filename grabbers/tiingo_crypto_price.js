const TiingoCryptoPriceModel = require('../models/tiingo_crypto_price');
const rp = require('request-promise');
const Promise = require('bluebird');
class TiingoCryptoPrice {
    constructor(db) {
        this.crypto_price_model = TiingoCryptoPriceModel(db);
    }

    setTicker(ticker) {
        this.ticker = ticker;
    }
    beginImport() {
        return this.crypto_price_model.sync().then(() => { return this._importPrices(); });
    }
    _importPrices() {
        let options = {
            uri: 'https://api.tiingo.com/tiingo/crypto/prices',
            qs: {
                tickers: this.ticker,
                startDate: '2018-01-01',
                resampleFreq: '1day',
                token: process.env.TIINGO_KEY // remove this from code!
            },
            json: true
        };
        return rp(options).then((data) => { return this._storePrices.bind(this)(data); })
            .catch((err) => {
                console.error(err);
            })
    }

    _storePrices(items) {
        items = items[0]; // lazy
        let promises = [];

        for(let i = 0; i < items.priceData.length; i++)  {
            let item = items.priceData[i];

            promises.push(
                this.crypto_price_model.upsert({
                    ticker: items.ticker,
                    baseCurrency: items.baseCurrency,
                    quoteCurrency: items.quoteCurrency,
                    tradesDone: item.tradesDone,
                    open: item.open,
                    high: item.high,
                    low: item.low,
                    close: item.close,
                    volumeNotational: item.volumeNotational,
                    volume: item.volume,
                    date: item.date
                })
            );
        }

        return Promise.all(promises);
    }

}

module.exports = TiingoCryptoPrice;
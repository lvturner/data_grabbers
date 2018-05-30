const TiingoNewsModel = require('../models/tiingo_news');
const rp = require('request-promise');
const Promise = require('bluebird');
class TiingoNews {
    constructor(db) {
        this.tiingo_news_model = TiingoNewsModel(db);
    }

    setTicker(ticker) {
        this.ticker = ticker;
    }
    beginImport() {
        this.tiingo_news_model.sync().then(() => { return this._importNews(); });
    }
    _importNews() {
        let options = {
            uri: 'https://api.tiingo.com/tiingo/news',
            qs: {
                tickers: this.ticker,
                token: process.env.TIINGO_KEY // remove this from code!
            },
            json: true
        };
        rp(options).then((data) => { return this._storeNews.bind(this)(data); })
            .catch((err) => {
                console.error(err);
            })
    }

    _storeNews(items) {
        let promises = [];
        for(let i = 0; i < items.length; i++)  {
            let item = items[i];
            promises.push(
                this.tiingo_news_model.upsert({
                    id: item.id,
                    tags: JSON.stringify(item.tags),
                    source: item.source,
                    description: item.description,
                    crawlDate: item.crawlDate,
                    url: item.url,
                    title: item.title,
                    publishedDate: item.publishedDate,
                    tickers: JSON.stringify(item.tickers)
                })
            );
        }

        return Promise.all(promises);
    }
}

module.exports = TiingoNews;
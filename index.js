const Promise = require('bluebird');
const db = require('./connection');
const TiingoNews = require('./grabbers/tiingo_news');
const TiingoCryptoPrice = require('./grabbers/tiingo_crypto_price');
const CoinMarketCap = require('./grabbers/coin_market_cap');
const BlockChainInfo = require('./grabbers/blockchain_info');
const StockTwitsSentiment = require('./grabbers/stocktwits_sentiment');
const StockTwitsMessageVolume = require('./grabbers/stocktwits_message_volume');
const GithubCodeFrequency = require('./grabbers/github_code_frequency');

let promiseArr = [];
const tn = new TiingoNews(db);
tn.setTicker('btc');
promiseArr.push(tn.beginImport());

const tp = new TiingoCryptoPrice(db);
tp.setTicker('btcusd');
promiseArr.push(tp.beginImport());

const cmc = new CoinMarketCap(db);
cmc.setTicker(1); // BTC == 1 on CoinMarketCap
promiseArr.push(cmc.beginImport());

const bci = new BlockChainInfo(db);
promiseArr.push(bci.beginImport());

const sts = new StockTwitsSentiment(db);
sts.setTicker('BTC.X');
promiseArr.push(sts.beginImport());

const stmv = new StockTwitsMessageVolume(db);
stmv.setTicker('BTC.X');
promiseArr.push(stmv.beginImport());

const ghcf = new GithubCodeFrequency(db);
ghcf.setTicker('bitcoin/bitcoin');
promiseArr.push(ghcf.beginImport());

Promise.all(promiseArr).then(() => {
    console.log("Done!");
    db.close();
}).catch((err) => {
    console.log("error!");
    console.log(err);
});

const StockTwitsMessageVolumeModel = require('../models/stocktwits_message_volume');
const rp = require('request-promise');
const Promise = require('bluebird');
class StockTwitsMessageVolume {
    constructor(db) {
        this.stocktwits_message_volume = StockTwitsMessageVolumeModel(db);
    }

    setTicker(ticker) {
        this.ticker = ticker;
    }
    beginImport() {
        return this.stocktwits_message_volume.sync().then(() => { return this._importData(); });
    }
    _importData() {
        let options = {
            uri: 'https://api.stocktwits.com/api/2/symbols/' + this.ticker + '/volume.json',
            json: true
        };
        return rp(options).then((data) => { return this._storeData.bind(this)(data); })
            .catch((err) => {
                console.error(err);
            })
    }

    _storeData(data) {
        let items = data.data;
        // need to modify to use some kind of async shitz
        let promises = [];
        for(let x = 0;x < items.length; x++) {
            let item = items[x];
            promises.push(
                this.stocktwits_message_volume.upsert({
                    volume_change: item.volume_change,
                    volume_score: item.volume_score,
                    timestamp: item.timestamp
                })
            );
        }

        return Promise.all(promises);
    }

}

module.exports = StockTwitsMessageVolume;
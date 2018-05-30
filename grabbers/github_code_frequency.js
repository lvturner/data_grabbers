const GithubCodeFrequencyModel = require('../models/github_code_frequency');
const rp = require('request-promise');
const Promise = require('bluebird');
class GithubCodeFrequency {
    constructor(db) {
        this.github_code_frequency = GithubCodeFrequencyModel(db);
    }

    setTicker(ticker) {
        this.ticker = ticker;
    }
    beginImport() {
        return this.github_code_frequency.sync().then(() => { return this._importData(); });
    }
    _importData() {
        let options = {
            uri: 'https://api.github.com/repos/' + this.ticker + '/stats/code_frequency',
            json: true,
            headers: { 'User-Agent': 'DataGrabber'}
        };
        return rp(options).then((data) => { return this._storeData.bind(this)(data); })
            .catch((err) => {
                console.error(err);
            })
    }

    _storeData(data) {
        let items = data;
        let promises = [];
        for(let x = 0;x < items.length; x++) {
            let item = items[x];
            promises.push(
                this.github_code_frequency.upsert({
                    additions: item[1],
                    deletions: item[2],
                    timestamp: item[0] * 1000 // convert date - could possibly do this on the model actually
                })
            )
        }

        return Promise.all(promises);
    }

}

module.exports = GithubCodeFrequency;
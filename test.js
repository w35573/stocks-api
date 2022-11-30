const tickers = require('./tickers.json');
const axios = require('axios');

async function setData() {
    try {
        for(let ticker of tickers) {
            try {
                const response = await axios.get(`http://localhost:3000/ticker/${ticker}/update`);
                console.log(ticker);
            } catch (error) {
                console.log(error.message);
                continue;
            }
        }
    } catch (error) {
        console.log(error);
    }
}

setData();
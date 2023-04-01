const axios = require('axios');
const baseURL = 'https://query1.finance.yahoo.com/v10/finance/quoteSummary'

const getData = async (ticker, options) => {
    try {
        const { data } = await axios.get(`${baseURL}/${ticker}?modules=${options.join(',')}`);

        return data.quoteSummary.result;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getData
}

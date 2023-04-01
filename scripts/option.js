const axios = require('axios');
const baseURL = 'https://query2.finance.yahoo.com/v7/finance/options';

//date will be a UNIX timestamp
const getOptions = async (ticker, date) => {
    try {
        const { data } = await axios.get(`${baseURL}/${ticker}`, {
            params: {
                date
            }
        });
        return data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}

module.exports = {
    getOptions
}
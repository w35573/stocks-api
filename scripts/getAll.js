const Ticker = require('../models/ticker');

async function getData() {
    try {
        const result = await Ticker.find({});

        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}

exports.getData = getData;
const Ticker = require('../models/ticker')

async function setData(data) {
    try {
        const result = await Ticker.findOneAndUpdate({ name: data.name }, { ...data }, { upsert: true });

        console.log(`Data saved successfully`);

        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}

exports.setData = setData;
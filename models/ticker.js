const mongoose = require('mongoose');

const tickerSchema = new mongoose.Schema({
    name: { type: 'String', required: true },
    price: { type: 'String' },
    change: { type: 'String' },
    pctChange: { type: 'String' },
    remark: { type: 'String' },
    prevClose: { type: 'String' },
    open: { type: 'String' },
    bid: { type: 'String' },
    ask: { type: 'String' },
    dayRange: { type: 'String' },
    yearRange: { type: 'String' },
    volume: { type: 'String' },
    avgVolume: { type: 'String' },
    marketCap: { type: 'String' },
    beta: { type: 'String' },
    PE: { type: 'String' },
    EPS: { type: 'String' },
    earningsDate: { type: 'String' },
    fwdDividendY: { type: 'String' },
    exDividendDate: { type: 'String' },
    tgtEst1Y: { type: 'String' }
}, { timestamps: true });

module.exports = mongoose.model('Ticker', tickerSchema);
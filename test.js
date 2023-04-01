//code to query /api/ticker/:ticker this endpoint at 2 second interval

const axios = require('axios');
const { setInterval } = require('timers');

const ticker = 'AAPL';

const interval = setInterval(() => {
    axios.get(`http://localhost:3000/api/v1/stocks/realtime/${ticker}`)
        .then(res => {
            console.log(
                res.data.data.name,
                res.data.data.price,
                res.data.data.change,
                res.data.data.pctChange
            );
        })
        .catch(err => {
            console.log(err);
        });
}, 1000);


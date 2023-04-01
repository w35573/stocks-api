require("dotenv").config({ path: "./config.env" });
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const gainers = require('./scripts/gainers');
// const losers = require('./scripts/losers');
// const etfs = require('./scripts/etfs');
// const futures = require('./scripts/futures');
// const indFutures = require('./scripts/indFutures');
// const worldIndices = require('./scripts/worldIndices');
// const indWorldIndices = require('./scripts/indWorldIndices');
// const currencies = require('./scripts/currencies');
// const indCurrencies = require('./scripts/indCurrencies');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

//GET home page
app.get('/', (req, res) => {
    res.send('Welcome to Stockers API');
});

app.use('/api/v1/stocks', require('./routes/stocks'));
app.use('/api/v1/fundamentals', require('./routes/fundamentalData'));
app.use('/api/v1/options', require('./routes/options'));

/* showing results for united states, mid/large/mega cap, vol greater than 15k, pctChange > 3*/
app.get('/api/gainers', async (req, res) => {
    try {
        const data = await gainers.getData();
        res.status(200).json({
            message: 'success',
            data
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
});

//GET top losers
/* showing results for united states, mid/large/mega cap, vol greater than 15k, pctChange > 3*/
app.get('/api/losers', async (req, res) => {
    try {
        const data = await losers.getData();
        res.status(200).json({
            message: 'success',
            data
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
});

//GET top 250 ETFs
/* showing results for united states, price>10*/
app.get('/api/etfs', async (req, res) => {
    try {
        const data = await etfs.getData();
        res.status(200).json({
            message: 'success',
            data
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
});

//GET futures
app.get('/api/futures', async (req, res) => {
    try {
        const data = await futures.getData();
        res.status(200).json({
            message: 'success',
            data
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
});

//GET individual future details
app.get('/api/futures/:ticker', async (req, res) => {
    const { ticker } = req.params;

    try {
        const data = await indFutures.getData(ticker);
        res.status(200).json({
            message: 'success',
            data
        });
    } catch (err) {
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
});

//GET world indices
app.get('/api/world-indices', async (req, res) => {
    try {
        const data = await worldIndices.getData();
        res.status(200).json({
            error: false,
            data
        });
    } catch (error) {
        res.status(404).json({
            error: true,
            message: error.message
        });
    }
});

//GET individual world index details
app.get('/api/world-indices/:ticker', async (req, res) => {
    const { ticker } = req.params;

    try {
        const data = await indWorldIndices.getData(ticker);
        res.status(200).json({
            error: false,
            data
        });
    } catch (err) {
        res.status(404).json({
            error: true,
            message: err.message
        });
    }
});

//GET currencies
app.get('/api/currencies', async (req, res) => {
    try {
        const data = await currencies.getData();
        res.status(200).json({
            error: false,
            data
        });
    } catch (error) {
        res.status(404).json({
            error: true,
            message: error.message
        });
    }
});

//GET individual currency details
app.get('/api/currencies/:ticker', async (req, res) => {
    const { ticker } = req.params;

    try {
        const data = await indCurrencies.getData(ticker);
        res.status(200).json({
            error: false,
            data
        });
    } catch (err) {
        res.status(404).json({
            error: true,
            message: err.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to mongoDB')
    })
    .catch((error) => {
        console.log(error)
    });






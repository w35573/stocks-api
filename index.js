require("dotenv").config({ path: "./config.env" });
const axios = require('axios');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const stock = require('./scripts/stock');
const profile = require('./scripts/profile');
const trending = require('./scripts/trending');
const mostActive = require('./scripts/mostActive');
const gainers = require('./scripts/gainers');
const losers = require('./scripts/losers');
const etfs = require('./scripts/etfs');
const futures = require('./scripts/futures');
const indFutures = require('./scripts/indFutures');
const worldIndices = require('./scripts/worldIndices');
const indWorldIndices = require('./scripts/indWorldIndices');
const currencies = require('./scripts/currencies');
const indCurrencies = require('./scripts/indCurrencies');
const stats = require('./scripts/stat');
const incomeStatement = require('./scripts/incomeStatement');
const updateData = require('./scripts/updateDB');
const getAll = require('./scripts/getAll');

const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());
app.use(cors());

//GET home page
app.get('/', (req, res) => {
    res.send('Welcome to Stockers API');
});

//GET ticker details
app.get('/api/ticker/:ticker', async (req, res) => {
    const { ticker } = req.params;
    try {
        const data = await stock.fetchData(ticker);
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

//GET profile details
app.get('/api/ticker/:ticker/profile', async (req, res) => {
    const { ticker } = req.params;

    try {
        const data = await profile.getData(ticker);
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

//GET trending tickers 
app.get('/api/trending', async (req, res) => {
    try {
        const data = await trending.getData();
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

//GET most active stocks
/* showing results for united states, mid/large/mega cap, vol greater than 5 mil*/
app.get('/api/most-active', async (req, res) => {
    try {
        const data = await mostActive.getData();
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

/* showing results for united states, mid/large/mega cap, vol greater than 15k, pctChange > 3*/
app.get('/api/gainers', async (req, res) => {
    try {
        const data = await gainers.getData();
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

//GET top losers
/* showing results for united states, mid/large/mega cap, vol greater than 15k, pctChange > 3*/
app.get('/api/losers', async (req, res) => {
    try {
        const data = await losers.getData();
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

//GET top 250 ETFs
/* showing results for united states, price>10*/
app.get('/api/etfs', async (req, res) => {
    try {
        const data = await etfs.getData();
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

//GET futures
app.get('/api/futures', async (req, res) => {
    try {
        const data = await futures.getData();
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

//GET individual future details
app.get('/api/futures/:ticker', async (req, res) => {
    const { ticker } = req.params;

    try {
        const data = await indFutures.getData(ticker);
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

//GET statistical information for a ticker
app.get('/api/ticker/:ticker/stats', async (req, res) => {
    const { ticker } = req.params;

    try {
        const data = await stats.getData(ticker);
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

//GET income statement for a ticker
app.get('/api/ticker/:ticker/income-statement', async (req, res) => {
    const { ticker } = req.params;

    try {
        const data = await incomeStatement.getData(ticker);
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

//Update data into mongoDB
app.get('/api/ticker/:ticker/update', async (req, res) => {
    const { ticker } = req.params;
    try {
        const tickerData = await stock.fetchData(ticker);
        const data = await updateData.setData(tickerData);
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

//GET data from database
app.get('/api/getAll', async (req, res) => {
    try {
        const data = await getAll.getData();
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






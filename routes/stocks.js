const express = require('express');
const router = express.Router();

const realtime = require('../scripts/stock');
const trending = require('../scripts/trending');
const mostActive = require('../scripts/mostActive')

//GET realtime price
router.get('/realtime/:ticker', async (req, res) => {
    const { ticker } = req.params;
    try {
        const data = await realtime.fetchData(ticker);
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


//GET trending stocks in us
router.get('/trending', async (req, res) => {
    try {
        const data = await trending.getData();
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

//GET most active stocks in us
router.get('/most-active', async (req, res) => {
    try {
        const data = await mostActive.getData();
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


module.exports = router;
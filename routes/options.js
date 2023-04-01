const express = require('express');
const router = express.Router();

const {
    getOptions
} = require('../scripts/option');

//GET options data where date is optional param
router.get('/:ticker', async (req, res) => {
    const { ticker } = req.params;
    const { date } = req.query;

    if (!ticker) {
        return res.status(400).json({
            message: 'Bad Request'
        });
    }

    //if date is present then check if it is valid UNIX date format
    if (date) {
        if (isNaN(date)) {
            return res.status(400).json({
                message: 'Bad Request'
            });
        }
    }

    try {
        const data = await getOptions(ticker, date);
        return res.status(200).json({
            message: 'success',
            data
        });
    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
});

module.exports = router;
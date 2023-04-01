const express = require('express');
const router = express.Router();
const { getData } = require('../scripts/fundamentals');
const moduleOptions = [
    'assetProfile',
    'incomeStatementHistory',
    'incomeStatementHistoryQuarterly',
    'balanceSheetHistory',
    'balanceSheetHistoryQuarterly',
    'cashflowStatementHistory',
    'cashflowStatementHistoryQuarterly',
    'defaultKeyStatistics',
    'financialData',
    'calendarEvents',
    'secFilings',
    'recommendationTrend',
    'upgradeDowngradeHistory',
    'institutionOwnership',
    'fundOwnership',
    'majorDirectHolders',
    'majorHoldersBreakdown',
    'insiderTransactions',
    'insiderHolders',
    'netSharePurchaseActivity',
    'earnings',
    'earningsHistory',
    'earningsTrend',
    'industryTrend',
    'indexTrend',
    'sectorTrend'
]

router.get('/:ticker', async (req, res) => {
    const { ticker } = req.params;
    if (!ticker) {
        return res.status(400).json({
            message: 'Bad Request'
        });
    }
    //options are specified in req params as comma separated words if nothing is specified then consider moduleOptions
    const options = req.query.options ? req.query.options.split(',') : moduleOptions;

    //check if options are valid by checking if they are present in moduleOptions
    const invalidOptions = options.filter(option => !moduleOptions.includes(option));
    if (invalidOptions.length > 0) {
        return res.status(400).json({
            message: 'Bad Request',
            invalidOptions
        });
    }

    try {
        const data = await getData(ticker, options);
        return res.status(200).json({
            message: 'success',
            data
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
});

module.exports = router;
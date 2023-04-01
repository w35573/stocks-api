const axios = require('axios');
const cheerio = require('cheerio');

const trendingURL = "https://finance.yahoo.com/trending-tickers";

async function getData() {
    try {
        const { data } = await axios.get(trendingURL);
        const $ = cheerio.load(data);
        const rows = $('.simpTblRow');

        const promises = rows.map(async (i, row) => {
            const json = {
                name: $(row).children().eq(0).text(),
                lastPrice: $(row).children().eq(1).text(),
                mktTime: $(row).children().eq(2).text(),
                change: $(row).children().eq(3).text(),
                pctChange: $(row).children().eq(4).text(),
                volume: $(row).children().eq(5).text(),
                mktCap: $(row).children().eq(6).text(),
                uri: `/ticker/${$(row).children().eq(0).text()}`
            };
            return json;
        }).get();

        const details = await Promise.all(promises);

        return Object.fromEntries(details.map((detail) => [detail.name, detail]));

    } catch (error) {
        throw error;
    }
}

exports.getData = getData;

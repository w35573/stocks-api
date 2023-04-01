const axios = require('axios');
const cheerio = require('cheerio');
const baseURL = "https://finance.yahoo.com/quote";

async function fetchData(ticker) {
    try {
        const response = await axios.get(`${baseURL}/${ticker}?p=${ticker}`);
        const $ = cheerio.load(response.data);

        const $realtime = $("#quote-header-info > div.My\\(6px\\).Pos\\(r\\).smartphone_Mt\\(6px\\).W\\(100\\%\\) > div.D\\(ib\\).Va\\(m\\).Maw\\(65\\%\\).Ov\\(h\\) > div");

        return {
            name: $("#quote-header-info > div.Mt\\(15px\\).D\\(f\\).Pos\\(r\\) > div.D\\(ib\\).Mt\\(-5px\\).Maw\\(38\\%\\)--tab768.Maw\\(38\\%\\).Mend\\(10px\\).Ov\\(h\\).smartphone_Maw\\(85\\%\\).smartphone_Mend\\(0px\\) > div.D\\(ib\\) > h1", response.data).text(),
            price: parseFloat($realtime.children().eq(0).text()),
            change: $realtime.children().eq(1).text(),
            pctChange: $realtime.children().eq(2).text().replace(/[()]/g, '')
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.fetchData = fetchData;

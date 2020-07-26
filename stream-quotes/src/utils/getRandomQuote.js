const Quote = require("../models/Quote");

const getRandomQuote = async author => {
    const quotes = await Quote.find({ author: RegExp(author, "i") });
    if (!quotes.length) {
        return null;
    }

    const index = Math.floor(Math.random() * quotes.length);
    return quotes[index];
};

module.exports = { getRandomQuote };

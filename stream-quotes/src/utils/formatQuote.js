const formatQuote = quote => {
    if (!quote) {
        return "";
    }

    return `"${quote.text}" - ${
        quote.author
    }, ${quote.date.toLocaleDateString()}`;
};

module.exports = { formatQuote };

const dayjs = require("dayjs");

const formatQuote = quote => {
    if (!quote) {
        return "";
    }

    return `"${quote.text}" - ${quote.author}, ${dayjs(quote.date).format(
        "DD.MM.YYYY"
    )}`;
};

module.exports = { formatQuote };

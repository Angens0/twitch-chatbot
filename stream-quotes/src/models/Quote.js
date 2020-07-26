const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
});

quoteSchema.statics.build = async (author, text, date) => {
    return await Quote.create({
        author,
        text,
        date,
    });
};

const Quote = mongoose.model("Quote", quoteSchema);

module.exports = Quote;

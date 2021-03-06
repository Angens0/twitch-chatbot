const tmi = require("tmi.js");

const opts = {
    identity: {
        username: process.env.BOT_USERNAME,
        password: process.env.BOT_OAUTH_TOKEN,
    },
    channels: [process.env.CHANNEL_NAME],
};

const client = new tmi.client(opts);
client.connect();

module.exports = { tmiClient: client };

const redis = require("redis");
const subscriber = redis.createClient();

module.exports = { subscriber };

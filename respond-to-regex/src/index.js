const { publisher } = require("./publisher");
const { subscriber } = require("./subscriber");

const expressions = [
    {
        pattern: /d(is)?c(ord)?/i,
        response: "<discord_link>",
    },
    {
        pattern: /f(ace)?b(ook)?/i,
        response: "<facebook_link>",
    },
    {
        pattern: /y(ou)?t(ube)?/i,
        response: "<youtube_link>",
    },
];

subscriber.subscribe("message");
subscriber.on("message", (channel, message) => {
    switch (channel) {
        case "message":
            const { channel, context, msg, self } = JSON.parse(message);

            if (self) break;

            const response = expressions.find(expression =>
                expression.pattern.test(msg)
            )?.response;

            if (response) {
                publisher.publish(
                    "say",
                    JSON.stringify({ target: channel, msg: response })
                );
            }
            break;
    }
});

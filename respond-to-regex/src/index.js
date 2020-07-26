const { publisher } = require("./publisher");
const { subscriber } = require("./subscriber");
const { getExpressions } = require("./mongoClient");

const start = async () => {
    let expressions = [];

    try {
        expressions = await getExpressions();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }

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
};

start();

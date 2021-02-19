const { publisher } = require("./publisher");
const { subscriber } = require("./subscriber");
const { getExpressions } = require("./mongoClient");

const start = async () => {
    let expressions = [];
    let sleeperStake = 1;
    const sleeperBaseTime = 60;

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

                const username = context.username;
                const sleeperCount = (msg.match(/ResidentSleeper/gi) || [])
                    .length;

                const getRandomIntInclusive = (min, max) => {
                    min = Math.ceil(min);
                    max = Math.floor(max);
                    return Math.floor(Math.random() * (max - min + 1)) + min;
                };

                if (sleeperCount > 0) {
                    let probability = Math.min(
                        Math.log10(sleeperCount * 2) * 0.5,
                        0.5
                    );
                    probability = Math.round(probability * 100) / 100;

                    publisher.publish(
                        "say",
                        JSON.stringify({
                            target: channel,
                            msg: `ResidentSleeper wykryty. Szansa na t/o wynosi: ${
                                probability * 100
                            }%. Obecna stawka: ${
                                sleeperStake * sleeperBaseTime
                            } sekund.`,
                        })
                    );
                    if (getRandomIntInclusive(1, 100) <= probability * 100) {
                        publisher.publish(
                            "say",
                            JSON.stringify({
                                target: channel,
                                msg: `/timeout ${username} ${
                                    sleeperStake * sleeperBaseTime
                                }`,
                            })
                        );
                        sleeperStake = 1;
                    } else {
                        sleeperStake += 1;
                    }
                }

                break;
        }
    });
};

start();

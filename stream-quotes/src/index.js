const mongoose = require("mongoose");
const { publisher } = require("./publisher");
const { subscriber } = require("./subscriber");
const { getRandomQuote } = require("./utils/getRandomQuote");
const { formatQuote } = require("./utils/formatQuote");

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
    } catch (error) {
        console.log("Error:", error);
        process.exit(1);
    }

    subscriber.subscribe("message");
    subscriber.on("message", async (channel, message) => {
        switch (channel) {
            case "message":
                const { channel, context, msg, self } = JSON.parse(message);

                if (self) break;

                const words = msg.trim().split(" ");

                let response = "";
                if (words[0] === process.env.COMMAND) {
                    const nickname = words.length === 1 ? "" : words[1];
                    response = formatQuote(await getRandomQuote(nickname));
                }

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

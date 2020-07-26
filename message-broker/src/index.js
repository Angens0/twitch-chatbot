const { tmiClient } = require("./tmiClient");
const { publisher } = require("./publisher");
const { subscriber } = require("./subscriber");

subscriber.subscribe("say");
subscriber.on("message", (channel, message) => {
    switch (channel) {
        case "say":
            const { target, msg } = JSON.parse(message);
            if (!target || !msg) {
                return;
            }

            console.log("Say:", msg);
            tmiClient.say(target, msg);
            break;
    }
});

tmiClient.on("message", (channel, context, msg, self) => {
    publisher.publish(
        "message",
        JSON.stringify({ channel, context, msg, self })
    );
});

tmiClient.on("connected", (addr, port) => {
    console.log(`* Connected to ${addr}:${port}`);
});

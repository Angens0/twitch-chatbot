import io from "socket.io-client";

const socket = io("localhost:4000");
socket.on("connect", () => {
    console.log("connected to socket server");
});

export { socket };

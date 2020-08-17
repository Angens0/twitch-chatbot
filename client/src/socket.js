import io from "socket.io-client";

const socket = io("", { path: "/api/sounds/socket.io" });
socket.on("connect", () => {
    console.log("connected to socket server");
});

export { socket };

import io from "socket.io-client";

const socket = io("http://localhost:4000", { path: "/api/sounds/socket.io" });
socket.on("connect", () => {
    console.log("connected to socket server");
});

export { socket };

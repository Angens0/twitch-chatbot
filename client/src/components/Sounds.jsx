import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { socket } from "../socket";
import meow from "../sounds/meow.wav";

const Sounds = () => {
    const [playing] = useState(true);
    const [volume, setVolume] = useState(0.3);
    const [mainQueue, setMainQueue] = useState([meow]);
    const [secondQueue, setSecondQueue] = useState([]);
    const [css, setCss] = useState({
        position: "absolute",
        width: "100vw",
        height: "100vh",
        display: "none",
    });

    useEffect(() => {
        socket.on("meow", () => {
            addToQueue(meow);
        });

        socket.on("url", url => {
            addToQueue(url);
        });

        socket.on("css", (property, value) => {
            setCss(oldCss => {
                const newCss = { ...oldCss };
                newCss[property] = value;
                return newCss;
            });
        });

        socket.on("volume", volume => {
            setVolume(() => volume);
        });
    }, []);

    const addToQueue = url => {
        setSecondQueue(queue => [...queue, url]);
    };

    useEffect(() => {
        if (!mainQueue.length && secondQueue.length) {
            setMainQueue(queue => [...queue, ...secondQueue]);
            setSecondQueue(() => []);
        }
    }, [mainQueue, secondQueue]);

    return (
        <div style={css}>
            <ReactPlayer
                playing={playing}
                volume={volume}
                url={mainQueue}
                width="100%"
                height="100%"
                onEnded={() => {
                    setMainQueue(queue => queue.slice(1, queue.length));
                }}
            />
        </div>
    );
};

export default Sounds;

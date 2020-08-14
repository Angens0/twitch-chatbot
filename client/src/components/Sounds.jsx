import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { socket } from "../socket";
import meow from "../sounds/meow.wav";

const Sounds = () => {
    const [playing] = useState(true);
    const [visible] = useState(true);
    const [volume, setVolume] = useState(1);
    const [mainQueue, setMainQueue] = useState([meow, meow, meow]);
    const [secondQueue, setSecondQueue] = useState([]);

    useEffect(() => {
        socket.on("meow", () => {
            addToQueue(meow);
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
        <div>
            <ReactPlayer
                style={{ display: visible ? "block" : "none" }}
                playing={playing}
                volume={volume}
                url={mainQueue}
                onEnded={() => {
                    setMainQueue(queue => queue.slice(1, queue.length));
                }}
            />
            <div>
                <input
                    type="range"
                    id="volume"
                    name="volume"
                    value={volume * 100}
                    onChange={event => setVolume(event.target.value / 100)}
                    min="0"
                    max="100"
                />
                <label htmlFor="volume">Volume</label>
            </div>
        </div>
    );
};

export default Sounds;

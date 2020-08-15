import React, { useState } from "react";
import { request } from "../utils/request";

const SoundsPanel = () => {
    const [url, setUrl] = useState("");
    const [volume, setVolume] = useState(0.5);

    const onSubmitUrl = async event => {
        event.preventDefault();
        await request({
            url: "http://localhost:4000/play",
            method: "post",
            body: { url },
            onSuccess: () => {
                setUrl("");
            },
        });
    };

    return (
        <div>
            <form onSubmit={onSubmitUrl}>
                <input
                    type="text"
                    value={url}
                    onChange={event => setUrl(event.target.value)}
                />
                <button>Play</button>
            </form>
            <input
                type="range"
                id="volume"
                name="volume"
                value={volume * 10}
                onChange={event => setVolume(event.target.value / 10)}
                min="0"
                max="10"
            />
            <label htmlFor="volume">Volume</label>
            <button>Play</button>
            <button>Pause</button>
            <button>Meow</button>
        </div>
    );
};

export default SoundsPanel;

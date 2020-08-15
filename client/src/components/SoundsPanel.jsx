import React, { useState, useEffect } from "react";
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
        <div className="SoundsPanel">
            <form>
                <h2>CSS</h2>
                <label>Property</label>
                <input type="text" />
                <label>Value</label>
                <input type="text" />
                <button>Submit</button>
            </form>
            <form onSubmit={onSubmitUrl}>
                <h2>Play sound from URL</h2>
                <label>URL</label>
                <input
                    type="text"
                    value={url}
                    onChange={event => setUrl(event.target.value)}
                />
                <button>Play</button>
            </form>
            <div className="controls">
                <h2>Controls</h2>
                <label htmlFor="volume">Volume</label>
                <input
                    type="range"
                    id="volume"
                    name="volume"
                    value={volume * 10}
                    onChange={event => setVolume(event.target.value / 10)}
                    min="0"
                    max="10"
                />
                <button>Play</button>
                <button>Pause</button>
                <button>Meow</button>
            </div>
        </div>
    );
};

export default SoundsPanel;

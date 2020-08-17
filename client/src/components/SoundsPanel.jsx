import React, { useState, useEffect } from "react";
import { request } from "../utils/request";
import CssForm from "./SoundsPanel/CssForm";
import PlayUrlForm from "./SoundsPanel/PlayUrlForm";

const SoundsPanel = () => {
    // TODO: load current volume as initial state
    const [volume, setVolume] = useState(0.3);

    useEffect(() => {
        request({
            url: "/api/sounds/volume",
            method: "post",
            body: { volume: volume },
        });
    }, [volume]);

    return (
        <div className="SoundsPanel">
            <CssForm />
            <PlayUrlForm />
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
                <button
                    onClick={async () => {
                        await request({
                            url: "/api/sounds/play/play",
                            method: "post",
                            body: {},
                        });
                    }}
                >
                    Play
                </button>
                <button
                    onClick={async () => {
                        await request({
                            url: "/api/sounds/play/pause",
                            method: "post",
                            body: {},
                        });
                    }}
                >
                    Pause
                </button>
                <button
                    onClick={async () => {
                        await request({
                            url: "/api/sounds/play/meow",
                            method: "post",
                            body: {},
                        });
                    }}
                >
                    Meow
                </button>
            </div>
        </div>
    );
};

export default SoundsPanel;

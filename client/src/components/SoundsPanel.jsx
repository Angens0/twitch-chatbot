import React, { useState, useEffect } from "react";
import { request } from "../utils/request";
import CssForm from "./SoundsPanel/CssForm";
import PlayUrlForm from "./SoundsPanel/PlayUrlForm";

const SoundsPanel = () => {
    // TODO: load current volume as initial state
    const [volume, setVolume] = useState(0.3);

    useEffect(() => {
        request({
            url: "http://localhost:4000/volume",
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
                <button>Play</button>
                <button>Pause</button>
                <button>Meow</button>
            </div>
        </div>
    );
};

export default SoundsPanel;

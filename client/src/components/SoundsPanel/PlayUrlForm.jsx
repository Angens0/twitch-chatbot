import React from "react";
import { request } from "../../utils/request";
import { useInputState } from "../../hooks/useInputState";

const PlayUrlForm = () => {
    const [url, handleUrlChange, resetUrl] = useInputState("");

    const onSubmit = async event => {
        event.preventDefault();
        await request({
            url: "/api/sounds/play",
            method: "post",
            body: { url },
            onSuccess: () => resetUrl(),
        });
    };

    return (
        <form onSubmit={onSubmit}>
            <h2>Play sound from URL</h2>
            <label>URL</label>
            <input type="text" value={url} onChange={handleUrlChange} />
            <button>Play</button>
        </form>
    );
};

export default PlayUrlForm;

import React from "react";
import { request } from "../../utils/request";
import { useInputState } from "../../hooks/useInputState";

const CssForm = () => {
    const [property, handlePropertyChange, resetProperty] = useInputState("");
    const [value, handleValueChange, resetValue] = useInputState("");

    const onSubmit = async event => {
        event.preventDefault();
        await request({
            url: `/css/${property}/${value}`,
            method: "post",
            body: {},
            onSuccess: () => {
                resetProperty();
                resetValue();
            },
        });
    };

    return (
        <form onSubmit={onSubmit}>
            <h2>CSS</h2>
            <label>Property</label>
            <input
                type="text"
                value={property}
                onChange={handlePropertyChange}
            />
            <label>Value</label>
            <input type="text" value={value} onChange={handleValueChange} />
            <button>Submit</button>
        </form>
    );
};

export default CssForm;

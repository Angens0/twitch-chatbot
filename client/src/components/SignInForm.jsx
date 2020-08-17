import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { request } from "../utils/request";

const SignInForm = () => {
    const [password, setPassword] = useState("");
    const history = useHistory();

    const onSubmit = async event => {
        event.preventDefault();

        await request({
            url: "/api/sounds/signin",
            method: "post",
            body: {
                password,
            },
            onSuccess: () => {
                // setPassword("");
                history.push("/panel");
            },
        });
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    type="password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
                <button>Sign In</button>
            </form>
            <button
                onClick={async () => {
                    await request({
                        url: "/api/sounds/signout",
                        method: "post",
                        body: {},
                    });
                }}
            >
                Sign Out
            </button>
        </>
    );
};

export default SignInForm;

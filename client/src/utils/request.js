import axios from "axios";

export const request = async ({ url, method, body, onSuccess }) => {
    try {
        const response = await axios[method](url, body, {
            withCredentials: true,
        });

        if (onSuccess) {
            onSuccess(response.data);
        }

        return response.data;
    } catch (error) {
        console.log(error);
    }
};

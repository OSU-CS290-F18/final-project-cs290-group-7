import axios from "axios";
import qs from "qs";

const authHeader = (token) => ({
    headers: {
        "Authorization": "Bearer " + token,
    }
});

export function registerAPI(username, password) {
    return axios.post("/register",
        qs.stringify({username: username, password: password})
    );
}

export function loginAPI(username, password) {
    return axios.post("/login",
        qs.stringify({username: username, password: password})
    );
}

export function logoutAPI(token) {
    return axios.delete("/logout", authHeader(token));
}

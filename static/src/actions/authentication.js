import { history } from "../store/configureStore";

import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGOUT_REQUEST,
    LOGOUT_COMPLETE,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
} from "../constants/index";

import { registerAPI, loginAPI, logoutAPI } from "../utils/auth-api";

export function loginSuccess(payload) {
    return {
        type: LOGIN_SUCCESS,
        payload: payload,
    }
}

export function loginFailure(payload) {
    return {
        type: LOGIN_FAILURE,
        payload: payload,
    }
}

export function loginRequest() {
    return {
        type: LOGIN_REQUEST,
    }
}

export function logoutRequest() {
    return {
        type: LOGOUT_REQUEST,
    }
}

export function logoutComplete() {
    return {
        type: LOGOUT_COMPLETE,
    }
}

export function login(username, password) {
    return function(dispatch) {
        dispatch(loginRequest());
        return loginAPI(username, password)
            .then(json => json.data)
            .then((response) => {
                dispatch(loginSuccess({
                    token: response.access_token,
                    tokenExpiration: response.access_expiration,
                    username: username,
                }));
                history.push('/');
            })
            .catch((error) => {
                if (error.response) {
                    dispatch(loginFailure(error.response.data));
                }
            });
    };
}

export function logout(token) {
    return function(dispatch) {
        dispatch(logoutRequest());
        return logoutAPI(token)
            .then((response) => {
                dispatch(logoutComplete());
                history.push("/login");
            })
            .catch((error) => {
                dispatch(logoutComplete());
                history.push("/login");
            });
    };
}

export function registerSuccess() {
    return {
        type: REGISTER_SUCCESS,
    };
}

export function registerFailure(payload) {
    return {
        type: REGISTER_FAILURE,
        payload: payload,
    };
}

export function registerRequest() {
    return {
        type: REGISTER_REQUEST,
    };
}

export function register(username, password) {
    return function(dispatch) {
        dispatch(registerRequest());
        return registerAPI(username, password)
            .then(json => json.data)
            .then((response) => {
                dispatch(registerSuccess());
                history.push('/login');
            })
            .catch((error) => {
                if (error.response) {
                    dispatch(registerFailure(error.response.data));
                }
            });
    };
}

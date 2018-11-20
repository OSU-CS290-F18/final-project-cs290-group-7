import { history } from "../store/configureStore";

import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGOUT_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
} from "../constants/index";

import { registerAPI, loginAPI } from "../utils/auth-api";

export function loginSuccess(token) {
    localStorage.setItem("token", token);
    return {
        type: LOGIN_SUCCESS,
        payload: {
            token,
        }
    }
}

export function loginFailure(token) {
    localStorage.removeItem("token");
    return {
        type: LOGIN_FAILURE,
        payload: {
            statuscode: error.response.statuscode,
            msg: error.response.msg,
        }
    }
}

export function loginRequest() {
    localStorage.removeItem("token");
    return {
        type: LOGIN_REQUEST,
    }
}

export function logoutRequest() {
    localStorage.removeItem("token");
    return {
        type: LOGOUT_REQUEST,
    }

}

export function login(username, password) {
    return function(dispatch) {
        dispatch(loginRequest());
        return loginAPI(username, password)
            .then(json => json.data)
            .then((response) => {
                console.log(response);
            })
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

import { createReducer } from "../utils/misc";

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

const initialState = {
    token: null,
    tokenExpiration: null,
    username: null,
    isAuthenticated: false,
    isAuthenticating: false,
    isRegistering: false,
    isRegistered: false,
    isLoggingOut: false,
    status: null,
}

export default createReducer(initialState, {
    [REGISTER_REQUEST]: (state) =>
        Object.assign({}, state, {
            isRegistering: true,
            status: null,
        }),
    [REGISTER_SUCCESS]: (state) =>
        Object.assign({}, state, {
            isRegistering: false,
            status: `Success: Account created. Please login.`,
        }),
    [REGISTER_FAILURE]: (state, payload) =>
        Object.assign({}, state, {
            isRegistering: false,
            status: `Error: ${payload.error}`,
        }),
    [LOGIN_REQUEST]: (state) =>
        Object.assign({}, state, {
            isAuthenticating: true,
            status: null,
        }),
    [LOGIN_SUCCESS]: (state, payload) =>
        Object.assign({}, state, {
            token: payload.token,
            tokenExpiration: payload.tokenExpiration,
            username: payload.username,
            isAuthenticating: false,
            isAuthenticated: true,
            status: null,
        }),
    [LOGIN_FAILURE]: (state, payload) =>
        Object.assign({}, state, {
            isAuthenticating: false,
            username: null,
            token: null,
            tokenExpiration: null,
            status: `Error: ${payload.error}`,
        }),
    [LOGOUT_REQUEST]: (state) =>
        Object.assign({}, state, {
            isLoggingOut: true,
            status: null,
        }),
    [LOGOUT_COMPLETE]: (state) =>
        Object.assign({}, state, {
            isLoggingOut: false,
            token: null,
            tokenExpiration: null,
            isAuthenticated: false,
            username: null,
            status: `Successfully logged out.`,
        }),
});

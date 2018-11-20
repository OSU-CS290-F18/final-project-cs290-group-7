import { createReducer } from "../utils/misc";

import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGOUT_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
} from "../constants/index";

const initialState = {
    token: null,
    username: null,
    isAuthenticated: false,
    isAuthenticating: false,
    isRegistering: false,
    isRegistered: false,
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
});

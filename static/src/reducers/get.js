import { createReducer } from "../utils/misc";

import {
    GET_SUCCESS,
    GET_FAILURE,
    GET_REQUEST,
} from "../constants/index";

const initialState = {
    isGetting: false,
    posts: null,
    status: null,
};

export default createReducer(initialState, {
    [GET_REQUEST]: (state) =>
        Object.assign({}, state, {
            isGetting: true,
            posts: null,
            status: null,
        }),
    [GET_SUCCESS]: (state, payload) =>
        Object.assign({}, state, {
            isGetting: false,
            posts: payload["posts"],
            status: null,
        }),
    [GET_FAILURE]: (state, payload) =>
        Object.assign({}, state, {
            isGetting: false,
            posts: payload["posts"],
            status: `Error: ${payload.error}`,
        }),
});

import { createReducer } from "../utils/misc";

import {
    POST_SUCCESS,
    POST_FAILURE,
    POST_REQUEST,
} from "../constants/index";

const initialState = {
    isPosting: false,
    status: null,
}

export default createReducer(initialState, {
    [POST_REQUEST]: (state) =>
        Object.assign({}, state, {
            isPosting: true,
            status: null,
        }),
    [POST_SUCCESS]: (state) =>
        Object.assign({}, state, {
            isPosting: false,
            status: `Success: Song uploaded.`,
        }),
    [POST_FAILURE]: (state, payload) =>
        Object.assign({}, state, {
            isPosting: false,
            status: `Error: ${payload.error}`,
        }),
});

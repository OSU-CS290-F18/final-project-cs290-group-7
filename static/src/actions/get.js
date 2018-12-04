import { history } from "../store/configureStore";

import {
    GET_SUCCESS,
    GET_FAILURE,
    GET_REQUEST,
} from "../constants/index";

import { getAPI } from "../utils/get-api";

export function getSuccess(payload) {
    return {
        type: GET_SUCCESS,
        payload: payload,
    }
}

export function getFailure(payload) {
    return {
        type: GET_FAILURE,
        payload: payload,
    }
}

export function getRequest() {
    return {
        type: GET_REQUEST,
    }
}

export function get(author, title, genre, limit) {
    return function(dispatch) {
        dispatch(getRequest());
        return getAPI(author, title, genre, limit)
            .then(json => json.data)
            .then((response) => {
                dispatch(getSuccess(response)); 
            })
            .catch((error) => {
                if (error.response) {
                    dispatch(getFailure(error.response.data));
                }
            });
    }
}

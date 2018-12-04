import { history } from "../store/configureStore";

import {
    POST_SUCCESS,
    POST_FAILURE,
    POST_REQUEST,
} from "../constants/index";

import { postAPI } from "../utils/post-api";

export function postSuccess() {
    return {
        type: POST_SUCCESS,
    }
}

export function postFailure(payload) {
    return {
        type: POST_FAILURE,
        payload: payload,
    }
}

export function postRequest() {
    return {
        type: POST_REQUEST,
    }
}

export function post(token, title, genre, music) {
    return function(dispatch) {
        dispatch(postRequest());
        return postAPI(token, title, genre, music)
            .then(json => json.data)   
            .then((response) => {
                dispatch(postSuccess());
                history.push('/');
            })
            .catch((error) => {
                if (error.response) {
                    dispatch(postFailure(error.response.data));
                } else if (error.message) {
                    dispatch(postFailure({error: "Please log on."}));
                    history.push('/login');
                }
            });
    };
}

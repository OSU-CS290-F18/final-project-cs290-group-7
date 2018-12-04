import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import authentication from "./authentication";
import post from "./post";
import get from "./get";


const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    authentication,
    post,
    get,
});

export default rootReducer;

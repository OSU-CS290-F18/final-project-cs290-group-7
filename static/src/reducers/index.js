import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import authentication from "./authentication";
import post from "./post";


const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    authentication,
    post,
});

export default rootReducer;

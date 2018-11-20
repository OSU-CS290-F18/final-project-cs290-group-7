import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import authentication from "./authentication";


const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    authentication,
});

export default rootReducer;

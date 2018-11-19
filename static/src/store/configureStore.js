import { applyMiddleware, compose, createStore } from "redux";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import rootReducer from "../reducers";

const history = createBrowserHistory();

const configureStore = function configureStore(initialState) {
    const store = createStore(
        rootReducer(history),
        initialState,
        compose(
            applyMiddleware(
                routerMiddleware(history)
            )
        )
    );
    return store;
};

export { history, configureStore };

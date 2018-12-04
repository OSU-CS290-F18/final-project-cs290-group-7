import { applyMiddleware, compose, createStore } from "redux";
import { createBrowserHistory } from "history";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { routerMiddleware } from "connected-react-router";
import thunkMiddleware from "redux-thunk";
import rootReducer from "../reducers";

const history = createBrowserHistory();
const persistConfigs = {
    key: "root",
    storage: storage,
}


const configureStore = function configureStore(initialState) {
    const store = createStore(
        persistReducer(persistConfigs, rootReducer(history)),
        initialState,
        compose(
            applyMiddleware(
                routerMiddleware(history),
                thunkMiddleware,

            )
        )
    );
    return store;
};

export { history, configureStore };

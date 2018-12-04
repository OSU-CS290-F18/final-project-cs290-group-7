import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Route, Switch} from "react-router";
import { ConnectedRouter } from "connected-react-router";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import PropTypes from "prop-types";

import { history, configureStore } from "./store/configureStore";
import routes from "./routes";

const initialState = {};
const store = configureStore(initialState);
const persistor = persistStore(store);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ConnectedRouter history={history}>
                {routes}
            </ConnectedRouter>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);

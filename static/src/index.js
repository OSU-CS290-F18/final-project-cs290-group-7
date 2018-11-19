import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Route, Switch} from "react-router";
import { ConnectedRouter } from 'connected-react-router';
import PropTypes from 'prop-types';

import { history, configureStore } from "./store/configureStore";
import routes from "./routes";

const initialState = {};
const store = configureStore(initialState);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            {routes}
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

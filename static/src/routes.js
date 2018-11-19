import React from "react";
import { Route, Switch } from "react-router";

import Header from "./components/Header/header";

const routes = (
    <div>
        <Route exact path="/" component={Header} />
        <Route exact path="/test" component={Header} />
    </div>
)

export default routes;

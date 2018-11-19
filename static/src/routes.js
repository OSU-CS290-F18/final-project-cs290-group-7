import React from "react";
import { Route, Switch } from "react-router";

import Header from "./components/Header/header";
import FrontPage from "./components/front-page";

const routes = (
    <div>
        <Route exact path="/" component={FrontPage} />
        <Route exact path="/test" component={Header} />
    </div>
)

export default routes;

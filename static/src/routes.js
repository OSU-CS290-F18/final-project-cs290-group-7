import React from "react";
import { Route, Switch } from "react-router";

import Header from "./components/Header/header";
import FrontPage from "./components/front-page";
import LoginPage from "./components/login-page";
import RegisterPage from "./components/register-page";

const routes = (
    <div>
        <Route exact path="/" component={FrontPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/test" component={Header} />
    </div>
)

export default routes;

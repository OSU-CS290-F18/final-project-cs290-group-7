import React from "react";
import { Route, Switch } from "react-router";

import FrontPage from "./components/front-page";
import LoginPage from "./components/login-page";
import RegisterPage from "./components/register-page";
import PostPage from "./components/post-page";
import ResultPage from "./components/result-page";
import ErrorPage from "./components/error-page";

const routes = (
    <Switch>
        <Route exact path="/" component={FrontPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/post" component={PostPage} />
        <Route exact path="/g/:genre" component={ResultPage} />
        <Route exact path="/u/:user" component={ResultPage} />
        <Route exact path="/s/:search" component={ResultPage} />
        <Route path="*" exact={true} component={ErrorPage} />
    </Switch>
);

export default routes;

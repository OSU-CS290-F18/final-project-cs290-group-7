import React from "react";
import { Route, Switch } from "react-router";

import FrontPage from "./components/front-page";
import LoginPage from "./components/login-page";
import RegisterPage from "./components/register-page";
import PostPage from "./components/post-page";

const routes = (
    <div>
        <Route exact path="/" component={FrontPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/post" component={PostPage} />
    </div>
)

export default routes;

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router-dom";

import Signin from "./components/Welcome/signin";
import SignUp from "./components/Welcome/signup";
import ChangePassword from "./components/password/changePassword";
import Header from "./components/header/header";
import Home from "./components/home/home";
import Error from "./pages/404Error";

const RouterComponent = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Signin />
        </Route>
        <Route exact path='/signup'>
          <SignUp />
        </Route>
        <Route exact path='/home'>
      <Header />
          <Home />
        </Route>
        <Route exact path='/changepassword'>
        <Header />
          <ChangePassword />
        </Route>
        <Header />
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Router>
  );
};
export default RouterComponent;
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router-dom";

import Signin from "./components/Welcome/signin";
import SignUp from "./components/Welcome/signup";
import Home from "./components/home/home";
import AllProjects from './components/projects/allProjects'
import UserProjects from './components/projects/userProjects'
import ChangePassword from "./components/password/changePassword";
import Header from "./components/header/header";
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
        <Route exact path='/projects/all'>
          <Header />
          <AllProjects />
        </Route>
        <Route exact path='/projects/user'>
          <Header />
          <UserProjects />
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
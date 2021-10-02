import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router-dom";

import Welcome from "./components/Welcome/signin";
import SignUp from "./components/Welcome/signup";
import ChangePassword from "./components/password/changePassword";
import Header from "./components/header/header";
import Error from "./pages/404Error";

const RouterComponent = () => {
  return (
    <Router>
          <Header />
      <Switch>
        <Route exact path='/signin'>
          <Welcome />
        </Route>
        <Route exact path='/signup'>
          <SignUp />
        </Route>
        {/* <AuthController> */}
          <Switch>
            <Route exact path='/changepassword'>
              <ChangePassword />
            </Route>
            <Route path="*">
              <Error />
            </Route>
          </Switch>
        {/* </AuthController> */}
      </Switch>
    </Router>
  );
};
export default RouterComponent;
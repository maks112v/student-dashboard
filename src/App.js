import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import cookie from "react-cookies";

import Welcome from "./Views/Welcome";
import AuthRoutes from "./AuthRoutes";

const Protected = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      cookie.load("code") ? <Component {...props} /> : <Redirect to="/verify" />
    }
  />
);

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/verify" render={props => <Welcome {...props} />} />
        <Protected path="/" component={props => <AuthRoutes {...props} />} />
      </Switch>
    );
  }
}

export default App;

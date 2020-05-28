import { HashRouter as Router, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import Feed from "../Routes/Feed";
import Auth from "../Routes/Auth";
import React from "react"

const LoggedInRoutes = () => (
  <>
    <Route exact path="/" component={Feed}></Route>
  </>
);
const LoggedOutRoutes = () => (
  <>
    <Route exact path="/" component={Auth}></Route>
  </>
);

const AppRouter = ({ isLoggedIn }) => (
  <Router>
    <Switch>{isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />} </Switch>
  </Router>
);

AppRouter.propTypes = {
    isLoggedIn : PropTypes.bool.isRequired
}

export default AppRouter;
import { Route, Switch, Redirect  } from "react-router-dom";
import PropTypes from "prop-types";
import Feed from "../Routes/Feed";
import Auth from "../Routes/Auth";
import React from "react"
import Profile from "../Routes/Profile";
import Explore from "../Routes/Explore";
import Search from "../Routes/Search";


const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/" component={Feed}></Route>
    <Route path="/explore" component={Explore}></Route>
    <Route path="/search" component={Search}></Route>
    <Route path="/:username" component={Profile}></Route>
    <Redirect from="*" to="/" />
  </Switch>
);
const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={Auth}></Route>
  </Switch>
);

const AppRouter = ({ isLoggedIn }) => (
  
    isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />
  
);

AppRouter.propTypes = {
    isLoggedIn : PropTypes.bool.isRequired
}

export default AppRouter;
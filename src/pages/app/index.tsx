// React Imports
import React from 'react';
import { Router, Route, Switch } from "react-router-dom";

// Utility
import {ROUTE} from '../../constants/route-constants';
import 'moment-timezone';

// Components
import {PrivateRoute} from '../../components-business/private-route';
import history from '../../components-business/history';

// Pages
import Dashboard from '../dashboard';
import LoginPage from '../login-page';
import RegisterPage from '../register-page';
import NotFound from '../not-found';

// Styling
import './app.scss';



function App() {
  // Wrapping logic over pages if any
  return <Pages/>;
}

const Pages = () => {
  return (
    <Router history={history}>
      <Switch>
        <PrivateRoute path={ROUTE.HOME_PAGE} exact={true} component={Dashboard} />
        <Route path={ROUTE.REGISTER_PAGE} exact={true} component={RegisterPage} />
        <Route path={ROUTE.LOGIN_PAGE} exact={true} component={LoginPage} />
        <PrivateRoute path={ROUTE.DASHBOARD_PAGE} exact={true} component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;

// React Imports
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Router, Route, Switch } from "react-router-dom";
import { RootState } from '../../slice';
import {
  updateCount
} from './app.slice';

// Utility
import {ROUTE} from '../../constants/route-constants';

// Components
import {PrivateRoute} from '../../components-business/private-route';
import history from '../../components-business/history';

// Pages
import Dashboard from '../dashboard';
import Manage from '../manage';
import ObjectPage from '../object-page';
import DevicePage from '../device-page';
import EmployeePage from '../employee-page';
import ActivationPage from '../activation-page';
import Template from '../template';
import NotFound from '../not-found';

// Styling
import './app.scss';


function App() {
  const dispatch = useDispatch()
  const { count } = useSelector(
    (state: RootState) => state.appSlice
  )

  const handleIncrement = () =>{
    dispatch(updateCount({count:count+1}))
  }

  const handleDecrement = () =>{
    dispatch(updateCount({count:count-1}))
  }

  return (
    <Pages/>
  );
}

const Pages = () => {
  return (
    <Router history={history}>
      <Switch>
        <PrivateRoute path={ROUTE.DASHBOARD_PAGE} exact={true} component={Dashboard} />
        <PrivateRoute path={ROUTE.MANAGE_PAGE} exact={true} component={Manage} />
        <PrivateRoute path={ROUTE.OBJECT_PAGE} exact={true} component={ObjectPage} />
        <PrivateRoute path={ROUTE.DEVICE_PAGE} exact={true} component={ObjectPage} />
        <PrivateRoute path={ROUTE.EMPLOYEE_PAGE} exact={true} component={EmployeePage} />
        <PrivateRoute path={ROUTE.ACTIVATION_PAGE} exact={true} component={ActivationPage} />
        <Route path={ROUTE.LOGIN_PAGE} exact={true} component={Template} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;

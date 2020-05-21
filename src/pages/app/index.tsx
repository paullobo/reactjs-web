// React Imports
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Router, Route, Switch } from "react-router-dom";
import { RootState } from '../../slice';
import {
  updateCount,
  checkIfAuthenticated
} from './app.slice';

// Utility

// Components
import {PrivateRoute} from '../../components-business/private-route';
import history from '../../components-business/history';

// Pages
import Dashboard from '../dashboard';
import Manage from '../manage';
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
        <PrivateRoute path="/" exact={true} component={Dashboard} />
        <PrivateRoute path="/manage" exact={true} component={Manage} />
        <Route path="/login" exact={true} component={Template} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;

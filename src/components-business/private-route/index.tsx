import React from "react";
import { Route,Redirect } from "react-router-dom";
import { useSelector,useDispatch  } from 'react-redux';
import { RootState } from '../../slice';
import { updateAuthState } from '../../pages/app/app.slice';
import {checkIfTokenValid} from '../../utils/auth';
interface IProps {
  exact?: boolean;
  path: string;
  component: React.ComponentType<any>;
}

export const PrivateRoute = ({ component: Component, ...rest }:IProps) => {
  
  let isAuthenticated = false;
  const dispatch = useDispatch();
  isAuthenticated = checkIfTokenValid(); 
  dispatch(updateAuthState({isAuthenticated}));

  return(
    <Route
      {...rest}
      render={props =>
        isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />)
};


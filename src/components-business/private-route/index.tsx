import * as React from "react";
import { Route,Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../slice';
import history from "../history";

interface IProps {
  exact?: boolean;
  path: string;
  component: React.ComponentType<any>;
}

// export const LoggedInRoute = ({
//   component: Component,
//   ...otherProps
// }: IProps) => {
//   const { isAuthenticated } = useSelector(
//     (state: RootState) => state.appSlice
//   )

//   if (isAuthenticated === false) {
//     history.push("/");
//   }

//   return (
//   <>
//     <Route
//       render={otherProps => (
//         <>
//           <Component {...otherProps} />
//         </>
//       )}
//     />
//   </>
// )};

// export const LoggedOutRoute = ({
//   component: Component,
//   ...otherProps
// }: IProps) => {

//   const { isAuthenticated } = useSelector(
//     (state: RootState) => state.appSlice
//   )
  
//   if (isAuthenticated === false) {
//     history.push("/manage");
//   }

//   return (
//   <>
//     <Route
//       render={otherProps => (
//         <>
//           <Component {...otherProps} />
//         </>
//       )}
//     />
//   </>
// )};

export const PrivateRoute = ({ component: Component, ...rest }:IProps) => {
  const { isAuthenticated } = useSelector(
    (state: RootState) => state.appSlice
  )
    
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
  />
)};


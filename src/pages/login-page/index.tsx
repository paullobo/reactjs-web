// React Imports
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateAuthState,
  updateUserData,
  loginUser
} from '../app/app.slice';

// Utility & Constants
import {ROUTE} from '../../constants/route-constants';
import {REQ_LOGIN} from '../../services/api';
import notifier from '../../utils/notifier';
import {checkIfTokenValid} from '../../utils/auth';
import {getErrorString} from '../../utils/common';

//Components
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from 'react-bootstrap/Button';

// Styling
import './login-page.scss';

// Assets
import {Images} from '../../assets/images';
import {Icons} from  '../../assets/icons';
var jwtDecode = require('jwt-decode');


const LoginPage = (props:any) => {

  let listenKeys:any=null;


  useEffect(()=>{
    const isAuthenticated = checkIfTokenValid(); 
    if(isAuthenticated){
      props.history.push(ROUTE.HOME_PAGE);
    }

    function handleKeyUp(event:any) {
      switch (event.key) {
        case "Enter":
          handleLogin();
          break;
      }
    }

    window.addEventListener("keyup", handleKeyUp);
    window.removeEventListener("keyup", handleKeyUp);
  },[])

  const dispatch = useDispatch();

  const [email,updateEmail] = useState('');
  const [password,updatePassword] = useState('');

  const handleInputChange = (event:any) =>{
    const id = event.target.name;
    const value = event.target.value;
    switch(id){
      case 'email':
        updateEmail(value);
        break;
      case 'password':
        updatePassword(value);
        break;
      default:
        console.warn('Something is not right !');
    }
  }

  const handleLogin = async() =>{
    try{
      if(email&&password){
        const requestBody = {
          email:email,
          password:password
        }
        const response = await REQ_LOGIN(requestBody);

        const {token,organizationData:userData} = response.data.result;

        // Date to redux
        dispatch(loginUser(userData,token));

        document.removeEventListener('keyup',listenKeys);
        // Redirect to home page
        props.history.push(ROUTE.HOME_PAGE);
      }else{
        throw 'Wow!, accessing without credentials?!';
      }
    }catch(e){
      const errorString = getErrorString(e);
      console.log('ERROR in handleLogin:::',errorString,e);
      dispatch(updateAuthState({isAuthenticated:false}));
      notifier.error('Error',errorString);
    }
  }

  return ( 
    <div className="page-wrapper login-page">
        <Row className={'page-container'}>
        <Col className={'left-container'}>
        <img src={Images.earthIdLogoTxt} className={'head-logo'}/>

           <div className={'signin-container'}>
               <div className={'title'}>
                   <b>Sign In</b> to your account
               </div>
               <div className={'field-container'}>
                   <TextField id="outlined-basic" label="Email ID" variant="outlined" name="email" onChange={handleInputChange} type={'email'} value={email}/>
               </div>
               <div className={'field-container'}>
                   <TextField id="outlined-basic" label="Password" variant="outlined" name="password" onChange={handleInputChange} type={'password'} value={password}/>
               </div>
               <div className={'checkbox-container'}>
                 <FormControlLabel
                   control={
                     <Checkbox
                       checked={true}
                       onChange={()=>{}}
                       name="checkedB"
                       color="primary"
                     />
                   }
                   label="Remember Me"
                 />
                 <div className="forgot-password">
                   Forgot Password
                 </div>
               </div>
               <Button className={'signup-btn'} onClick={handleLogin} disabled={!email&&!password}>Login</Button>
           </div>
         </Col>
       
          <Col className={'right-container'}>
            <div className={'text-block'}>
                <img src={Images.securityLockShield} className={'ele ele-1'}/>
                <div className={'text-block-head'}>Don't have an account?</div>
                <div className={'text-block-desc'}>Create new account</div>
                <div className={'register-btn'} onClick={()=>props.history.push(ROUTE.REGISTER_PAGE)}>Create</div>
            </div>
          </Col>
          </Row>
    </div>
  );
};

export default LoginPage;

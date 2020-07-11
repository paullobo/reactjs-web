// React Imports
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  updateAuthState,
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
import Spinner from 'react-bootstrap/Spinner';

// Styling
import './login-page.scss';

// Assets
import {Images} from '../../assets/images';


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
  },[]) //eslint-disable-line

  const dispatch = useDispatch();

  const [email,updateEmail] = useState('');
  const [password,updatePassword] = useState('');
  const [loading, setLoader] = useState(false);

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
        setLoader(true);
        const requestBody = {
          email:email,
          password:password
        }
        const response = await REQ_LOGIN(requestBody);

        const {token,userData} = response.data.result;
        console.log('LOGGED IN USER',userData)
        // Date to redux
        dispatch(loginUser(userData,token));

        document.removeEventListener('keyup',listenKeys);
        // Redirect by default to home page or based on history
        //props.history.push(ROUTE.HOME_PAGE);
        //props.history.goBack()
        //window.history.back();
        handlePageRedirection()
      }else{
        throw new Error('Wow!, accessing without credentials?!');
      }
      setLoader(false);
    }catch(e){
      setLoader(false);
      const errorString = getErrorString(e);
      console.log('ERROR in handleLogin:::',errorString,e);
      dispatch(updateAuthState({isAuthenticated:false}));
      notifier.error('Error',errorString);
    }
  }
 
  const handlePageRedirection = () =>{
    try{
      const pageURL = new URL(window.location.href);
      let redirectPath = pageURL.searchParams.get('redirect');
      if(redirectPath){
        redirectPath = `/${redirectPath}`;
        const validRoutesArray = Object.values(ROUTE);
        if(!validRoutesArray.includes(redirectPath)){
            redirectPath = ROUTE.HOME_PAGE;
        }
      }else{
        redirectPath = ROUTE.HOME_PAGE;
      }
      props.history.push(redirectPath);
    }catch(e){
      console.log('ERROR in path Re-direction:::',e);
    }
  }

  return ( 
    <div className="page-wrapper login-page">
        <Row className={'page-container'}>
        <Col className={'left-container'}>
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
               
               <Button className={'signup-btn'} variant="success" onClick={handleLogin} disabled={(!email&&!password) || loading}>
                 Login  {loading ? <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                /> : null}
              </Button>
           </div>
         </Col>
       
          <Col className={'right-container'}>
            <div className={'text-block'}>
                <img src={Images.fingerprint} className={'ele ele-1'} alt={''}/>
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

// React Imports
import React, { useState } from 'react';

// Utility & Constants
import {validateRegisterData} from '../../utils/validator';
import {ROUTE} from '../../constants/route-constants';
import {REQ_REGISTER} from '../../services/api';
import {getErrorString} from '../../utils/common';
import notifier from '../../utils/notifier';

// Components
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';


// Styling
import './register-page.scss';

// Assets
import {Images} from '../../assets/images';


const RegisterPage = (props:any) => {

  // Variable State declarations
  const [errors,updateErrors] = useState({});
  const [firstName,updateFirstName] = useState('');
  const [lastName,updateLastName] = useState('');
  const [phone,updatePhone] = useState('');
  const [email,updateEmail] = useState('');
  const [password,updatePassword] = useState('');
  const [cpassword,updateConfirmPassword] = useState('');
  const [terms,updateTerms] = useState(false);
  const [loading,setLoader] = useState(false);




  const handleInputChange = (event:any) =>{
    const id = event.target.name;
    const value = event.target.value;
    console.log('ID VALUE',id,event.target.checked)
    switch(id){
      case 'firstName':
        updateFirstName(value);
        break;
      case 'lastName':
        updateLastName(value);
        break;
      case 'phone':
        updatePhone(value);
        break;
      case 'email':
        updateEmail(value);
        break;
      case 'password':
        updatePassword(value);
        break;
      case 'cpassword':
        updateConfirmPassword(value);
        break;
      case 'terms':
        updateTerms(event.target.checked);
        break;
      default:
        console.log('Something fishy!')
    }
  }

  const handleRegister = async() =>{
    try{
      setLoader(true);
      const data = {firstName,lastName,phone,email,password,cpassword};
      const errors = validateRegisterData(data);
      if(!errors){
        // Good to go!
        const requestBody = {
          firstName:firstName,
          lastName:lastName,
          email: email.toLowerCase(),
          password: password,
          mobile: phone
        }
        const response = await REQ_REGISTER(requestBody); 
        notifier.success('You\'re Registered!');        
        setLoader(false);
        handlePageRedirection()
      }else{  
        // Found Errors
        console.log('VALIDATION ERROR handleRegister:::',errors);
        updateErrors(errors);
        notifier.warning('Warning','Something is not right');
        setLoader(false);
      }
    }catch(e){
      const errorString = getErrorString(e);
      console.log('ERROR in handleRegister:::',errorString,e);
      notifier.error('Error',errorString);
      setLoader(false);
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
          redirectPath = ROUTE.LOGIN_PAGE;
        }
      }else{
        redirectPath = ROUTE.LOGIN_PAGE;
      }
      props.history.push(redirectPath);
    }catch(e){
      console.log('ERROR in path Re-direction:::',e);
    }
  }


  return ( 
    <div className="page-wrapper register-page">
      <Row className={'page-container'}>
        <Col className={'left-container'}>
          <div className={'text-block'}>
              <img src={Images.userData} className={'ele ele-1'} alt={''}/>
              <div className={'text-block-head'}>Already Signed up?</div>
              <div className={'text-block-desc'}>Login to your account</div>
              <div className={'login-btn'} onClick={()=>props.history.push(ROUTE.LOGIN_PAGE)}>Login</div>
          </div>
        </Col>
        <Col className={'right-container'}>
        
          <div className={'signup-container'}>
              <div className={'title'}>
                  <b>Sign Up</b> for an account
              </div>
              <div className={'field-container'}>
                  <TextField label="First Name" error={(errors as any).firstName} helperText={(errors as any).firstName} variant="outlined" value={firstName} name="firstName" onChange={handleInputChange}/>
              </div>
              <div className={'field-container'}>
                  <TextField label="Last Name" error={(errors as any).lastName} helperText={(errors as any).lastName} variant="outlined" value={lastName} name="lastName" onChange={handleInputChange}/>
              </div>
              <div className={'field-container'}>
                  <TextField label="Phone No" variant="outlined" error={(errors as any).phone} helperText={(errors as any).phone} type="phone" value={phone} name="phone" onChange={handleInputChange}/>
              </div>
              <div className={'field-container'}>
                  <TextField label="Email ID" variant="outlined" error={(errors as any).email} helperText={(errors as any).email} type="email" value={email} name="email" onChange={handleInputChange}/>
              </div>
              <div className={'field-container'}>
                  <TextField label="Password" variant="outlined" error={(errors as any).password} helperText={(errors as any).password} type="password" value={password} name="password" onChange={handleInputChange}/>
              </div>
              <div className={'field-container'}>
                  <TextField label="Confirm Password" variant="outlined" error={(errors as any).cpassword} helperText={(errors as any).cpassword} type="password" value={cpassword} name="cpassword" onChange={handleInputChange}/>
              </div>
              <div className={'checkbox-container'}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={terms}
                      onChange={handleInputChange}
                      name="terms"
                      color="primary"
                    />
                  }
                  label=""
                />
                <div className="checkbox-label">
                  By creating an account, you agree to Terms & Conditions.
                </div>
              </div>
                <Button className={'signup-btn'} variant="success" disabled={!terms || loading} onClick={handleRegister}>
                  Create Account  
                  {loading ? <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  /> : null}
                  </Button>
          </div>
        </Col>
      </Row>
  </div>

  );
};

export default RegisterPage;

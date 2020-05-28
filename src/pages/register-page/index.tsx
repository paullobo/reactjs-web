// React Imports
import React, { useState } from 'react';

// Utility & Constants
import {validateRegisterData} from '../../utils/validator';
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

// Styling
import './register-page.scss';

// Assets
import {Images} from '../../assets/images';
import {Icons} from  '../../assets/icons';


const RegisterPage = (props:any) => {

  // Variable State declarations
  const [errors,updateErrors] = useState({});
  const [orgName,updateOrgName] = useState('');
  const [address,updateAddress] = useState('');
  const [phone,updatePhone] = useState('');
  const [email,updateEmail] = useState('');
  const [password,updatePassword] = useState('');
  const [cpassword,updateConfirmPassword] = useState('');
  const [terms,updateTerms] = useState(false);


  const handleInputChange = (event:any) =>{
    const id = event.target.name;
    const value = event.target.value;
    console.log('ID VALUE',id,event.target.checked)
    switch(id){
      case 'orgName':
        updateOrgName(value);
        break;
      case 'address':
        updateAddress(value);
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
      const data = {orgName,address,phone,email,password,cpassword};
      const errors = validateRegisterData(data);
      if(!errors){
        // Good to go!
        const requestBody = {
          name:orgName,
          email: email.toLowerCase(),
          password: password,
          mobile: phone,
          address1: address,
        }
        const response = await REQ_REGISTER(requestBody); 
        console.log('RESPONSE handleRegister:::',response);
        notifier.success('You\'re Registered!','Verfication link sent to your mail');
      }else{  
        // Found Errors
        console.log('VALIDATION ERROR handleRegister:::',errors);
        updateErrors(errors);
        notifier.warning('Warning','Something is not right');
      }
    }catch(e){
      const errorString = getErrorString(e);
      console.log('ERROR in handleRegister:::',errorString,e);
      notifier.error('Error',errorString);
    }
  }

  return ( 
    <div className="page-wrapper register-page">
        <Row className={'page-container'}>
          <Col className={'left-container'}>
            <div className={'text-block'}>
                <img src={Images.earthProjection} className={'ele ele-1'}/>
                <div className={'text-block-head'}>Already Signed up?</div>
                <div className={'text-block-desc'}>Login to your account</div>
                <div className={'login-btn'}>Login</div>
            </div>
          </Col>
          <Col className={'right-container'}>
           
            <div className={'signup-container'}>
                <img src={Images.earthIdLogoTxt} className={'head-logo'}/>
                <div className={'title'}>
                    <b>Sign Up</b> for an account
                </div>
                <div className={'field-container'}>
                    <TextField label="Organization Name" variant="outlined" value={orgName} name="orgName" onChange={handleInputChange}/>
                </div>
                <div className={'field-container'}>
                    <TextField label="Address" variant="outlined" value={address} name="address" onChange={handleInputChange}/>
                </div>
                <div className={'field-container'}>
                    <TextField label="Phone No" variant="outlined" type="phone" value={phone} name="phone" onChange={handleInputChange}/>
                </div>
                <div className={'field-container'}>
                    <TextField label="Email ID" variant="outlined" type="email" value={email} name="email" onChange={handleInputChange}/>
                </div>
                <div className={'field-container'}>
                    <TextField label="Password" variant="outlined" type="password" value={password} name="password" onChange={handleInputChange}/>
                </div>
                <div className={'field-container'}>
                    <TextField label="Confirm Password" variant="outlined" type="password" value={cpassword} name="cpassword" onChange={handleInputChange}/>
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
                <Button className={'signup-btn'} disabled={!terms} onClick={handleRegister}>Create Account</Button>
            </div>
          </Col>
        </Row>
    </div>
  );
};

export default RegisterPage;

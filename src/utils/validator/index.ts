import {MESSAGE} from '../../constants/messages';

export const validateRegisterData = (data:any) =>{
    const {firstName,phone,email,password,cpassword} = data;
    let error :any= {};
    if(firstName){
        if(firstName.length<3){
            error.firstName = MESSAGE.ERROR.USER_NAME_LENGTH;
        }
    }else{
        error.firstName = MESSAGE.ERROR.USER_NAME_EMPTY;
    }
    if(phone){
        if(!validatePhoneNo(phone)){
            error.phone = MESSAGE.ERROR.PHONE_INVALID;
        }
    }else{
        error.phone = MESSAGE.ERROR.PHONE_EMPTY
    }
    if(email){
        if(!validateEmailId(email)){
            error.email = MESSAGE.ERROR.EMAIL_INVALID;
        }
    }else{
        error.email = MESSAGE.ERROR.EMAIL_EMPTY
    }
    if(password){
        if(password!==cpassword){
            error.cpassword = MESSAGE.ERROR.PASSWORD_INVALID;
        }
    }else{
        error.password = MESSAGE.ERROR.PASSWORD_EMPTY;
    }

    return Object.keys(error).length >0 ? error : false;
}

export const validateEmailId = (email:any) =>{
    //eslint-disable-next-line
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
    return re.test(String(email).toLowerCase());        
}

export const validatePhoneNo = (phone:any) =>{
    // Checks US nos too
    //const re = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    
    // Non-US no regex
    //const re = /^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
    
    //return re.test(phone);
    phone = phone.toString();
    return phone.length>9 && phone.length<12;
}

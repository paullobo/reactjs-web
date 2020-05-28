import {db} from '../local-storage';
import {LOCAL_STOARGE} from '../../constants/common';
var jwtDecode = require('jwt-decode');

export const checkIfTokenValid = (redirect:boolean|string=false) => {
    try{
        let token = JSON.parse(window.localStorage.getItem('token') as any);
        if(token){
            // Decoding token
            var decoded = jwtDecode(token);
            let currentTimestamp = Math.floor(Date.now() / 1000) + (60 * 60)
            if (currentTimestamp > decoded.exp) {
                console.warn('AUTH TOKEN EXPIRED');
                // Case 1: Token Expired
                throw 'Please login to continue';
            }else{
            // Valid token, Good to go!
            return (true);
            }
        }else{
            console.warn('TOKEN NOT AVAILABLE');
            // Case 2: No Token available
            throw 'Please login to continue';
        }
    }catch(e){
        // Case 1 or 2 or Maybe local token is tampered
        if(typeof redirect === 'string'){
            // Redirect should be a valid URL
            window.location.href = redirect;
        }
        return false;
    }
}

export const updateToken = async(token:string) => {
    return new Promise(async(resolve,reject)=>{
        try{
            await db.set(LOCAL_STOARGE.authToken,token);
            resolve();
        }catch(e){
            reject(e);
        }
    })
}

export const updateProfileUserData = async(data:string) => {
    return new Promise(async(resolve,reject)=>{
        try{
             await db.set(LOCAL_STOARGE.userData,data);
            resolve();
        }catch(e){
            reject(e);
        }
    })
}

export const getUserData = () => {
    try{
        let userData :any= window.localStorage.getItem(LOCAL_STOARGE.userData);
        userData = userData ? JSON.parse(userData) : {};
        return userData;
    }catch(e){
        // Data tampered
        return {};
    }
    
}


export const clearLocalUser = async() =>{
    try{
        await db.set(LOCAL_STOARGE.authToken,null);
        await db.set(LOCAL_STOARGE.userData,null);
    }catch(e){
        // Data tampered
        console.log('ERROR:::',e)
    }
}

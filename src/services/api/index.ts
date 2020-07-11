import axios from 'axios';
import {API} from '../../constants/api-constants';
import {MESSAGE} from '../../constants/messages';
import {LOCAL_STOARGE} from '../../constants/common';
import {db} from '../../utils/local-storage';


interface IReqHeader {
    'Content-Type'?:string,
    Authorization?: string
}

const getAuthHeader = async() =>{
    // handles api authorization
    try{
        const authToken = await db.get(LOCAL_STOARGE.authToken);
        if(!authToken){
            throw MESSAGE.ERROR.SESSION_EXPIRED;
        }
        return {
            Authorization: authToken
        }
    }catch(e){
        window.location.reload();
        throw MESSAGE.ERROR.SESSION_EXPIRED;
    }
} 

export const REQ_LOGIN = async(body:any)=> await axios.post(API.LOGIN,body);
export const REQ_REGISTER = async(body:any)=> await axios.put(API.REGISTER,body);

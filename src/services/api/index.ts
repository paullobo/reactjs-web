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
export const REQ_REGISTER = async(body:any)=> await axios.post(API.REGISTER,body);

export const REQ_GET_EMPLOYEE= async(params:any)=> await axios.get(API.GET_EMPLOYEE,{params,headers:await getAuthHeader()});
export const REQ_ADD_EMPLOYEE= async(body:any)=> await axios.put(API.ADD_EMPLOYEE,body,{headers:await getAuthHeader()});
export const REQ_UPDATE_EMPLOYEE= async(body:any)=> await axios.post(API.UPDATE_EMPLOYEE,body,{headers:await getAuthHeader()});

// export const REGISTER = async(body:any,headers:IReqHeader)=> await axios.post(API.LOGIN,{data:body},{headers});
import axios from 'axios';
import {API} from '../../constants/api-constants';

interface IReqHeader {
    'Content-Type'?:string,
    Authorization?: string
}

const authenticateAPI = async(apiCall:Function) =>{

    apiCall()
} 

export const REQ_LOGIN = async(body:any)=> await axios.post(API.LOGIN,body);
export const REQ_REGISTER = async(body:any)=> await axios.post(API.REGISTER,body);

export const REQ_GET_EMPLOYEE= async(params:any)=> await axios.get(API.GET_EMPLOYEE,{params});
export const REQ_ADD_EMPLOYEE= async(body:any)=> await axios.put(API.ADD_EMPLOYEE,body);
export const REQ_UPDATE_EMPLOYEE= async(body:any)=> await axios.post(API.UPDATE_EMPLOYEE,body);

// export const REGISTER = async(body:any,headers:IReqHeader)=> await axios.post(API.LOGIN,{data:body},{headers});
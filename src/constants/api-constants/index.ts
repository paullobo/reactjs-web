const SERVER_URL = process.env.REACT_APP_SERVER_STAGE_URL;
const version = '/api';

export const API = {
    
    // Organization
    REGISTER:`${SERVER_URL}${version}/auth/register`,
    LOGIN:`${SERVER_URL}${version}/auth/login`,
    RESET_PASSWORD:`${SERVER_URL}${version}/auth/resetPasswordRequest`,

    // Employee
    GET_EMPLOYEE:`${SERVER_URL}${version}/employee`,
    ADD_EMPLOYEE:`${SERVER_URL}${version}/employee/add`,
    UPDATE_EMPLOYEE:`${SERVER_URL}${version}/employee/update`,

}


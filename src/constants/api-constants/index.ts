const SERVER_URL = process.env.REACT_APP_SERVER_STAGE_URL;
const version = '';

export const API = {
    
    // User
    REGISTER:`${SERVER_URL}${version}/auth/register`,
    LOGIN:`${SERVER_URL}${version}/auth/login`,


}


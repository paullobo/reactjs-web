import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit'
// Utility
import {getUserData,clearLocalUser,updateToken,updateProfileUserData} from '../../utils/auth';
import { ROUTE } from '../../constants/route-constants';

const userdata = getUserData();

// Interface Declerations
interface IStateData {
    isAuthenticated:Boolean,
    userData:any,
    count:number
}

interface IUpdateAuthState {
  isAuthenticated:Boolean
}

interface IUpdateCountPayload {
  count:number
}

interface IUpdateUserData {
  userData:any
}


// Intial State
let initialState: IStateData = {
  isAuthenticated:false,
  userData:userdata,
  count:0
}

// Slice
const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    updateAuthState(state, action: PayloadAction<IUpdateAuthState>) {
      const { isAuthenticated } = action.payload
      state.isAuthenticated = isAuthenticated;
    },
    updateUserData(state, action: PayloadAction<IUpdateUserData>) {
      const { userData } = action.payload
      state.userData = userData;
    }
  
  }
})

// Slice actions exposed and exported
export const {
  updateAuthState,
  updateUserData,
} = appSlice.actions;

// Slice exported
export default appSlice.reducer;

// Slice wrapped functions
export const logoutUser = () => (dispatch:Dispatch) =>{
  // Clear local storage
  clearLocalUser();

  dispatch(updateAuthState({isAuthenticated:false}));
  dispatch(updateUserData({userData:{}}));
  window.location.href = ROUTE.LOGIN_PAGE;
}

export const loginUser = (userData:any,token:any) => async(dispatch:Dispatch) =>{
    // Data store to local storage
    await updateToken(token);
    console.log('USERDATA',userData)
    await updateProfileUserData(userData);
    dispatch(updateAuthState({isAuthenticated:true}));
    dispatch(updateUserData({userData}));
}

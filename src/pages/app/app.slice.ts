import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit'
// Utility
import {db} from '../../utils/local-storage';
import {getUserData,clearLocalUser,updateToken,updateProfileUserData} from '../../utils/auth';
import {LOCAL_STOARGE} from '../../constants/common';

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
    },
    updateCount(state, action: PayloadAction<IUpdateCountPayload>) {
        const { count } = action.payload
        state.count = count;
    }
  }
})

// Slice actions exposed and exported
export const {
  updateAuthState,
  updateUserData,
  updateCount
} = appSlice.actions;

// Slice exported
export default appSlice.reducer;

// Slice wrapped functions
export const logoutUser = () => (dispatch:Dispatch) =>{
  // Clear local storage
  clearLocalUser();

  dispatch(updateAuthState({isAuthenticated:false}));
  dispatch(updateUserData({userData:{}}));
}

export const loginUser = (userData:any,token:any) => async(dispatch:Dispatch) =>{
    // Data store to local storage
    await updateToken(token);
    
    await updateProfileUserData(userData);
    dispatch(updateAuthState({isAuthenticated:true}));
    dispatch(updateUserData({userData}));
}
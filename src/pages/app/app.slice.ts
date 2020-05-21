import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit'
// Utility
import {db} from '../../utils/local-storage';

// Interface Declerations
interface IStateData {
    isAuthenticated:Boolean
    count:number
}

interface IUpdateAuthState {
  isAuthenticated:Boolean
}

interface IUpdateCountPayload {
  count:number
}


// Intial State
let initialState: IStateData = {
  isAuthenticated:true,
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
    updateCount(state, action: PayloadAction<IUpdateCountPayload>) {
        const { count } = action.payload
        state.count = count;
    }
  }
})

// Slice actions exposed and exported
export const {
  updateAuthState,
  updateCount
} = appSlice.actions;

// Slice exported
export default appSlice.reducer;

// Slice wrapped functions
export const checkIfAuthenticated = () => (dispatch:Dispatch):Promise<any> =>{
  return new Promise(async(resolve,reject)=>{
    try{
      if(await db.get('token')){
        // Dummy check 
        dispatch(updateAuthState({isAuthenticated:true}));
        resolve();
      }
        // @TODO Hit api to check authentication
        // @TODO Store to local storage auth token
        setTimeout(() => {
          db.set('token','sdfggdgagbvdjsaaaaaaaaaa');
          dispatch(updateAuthState({isAuthenticated:true}));
          resolve();
        }, 5000);
    }catch(e){
      reject(e);
    }
  })
}
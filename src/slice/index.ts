import { combineReducers } from '@reduxjs/toolkit'
import appSlice from '../pages/app/app.slice';

const rootReducer = combineReducers({
    appSlice
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
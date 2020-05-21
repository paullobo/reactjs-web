import { configureStore } from '@reduxjs/toolkit'

import rootReducer from '../slice'

const store :any= configureStore({
  reducer: rootReducer
})

if (process.env.NODE_ENV === 'development' && (module as any).hot) {
  (module as any).hot.accept('../slice', () => {
    const newRootReducer = rootReducer
    store.replaceReducer(newRootReducer)
  })
}

export type AppDispatch = typeof store.dispatch

export default store
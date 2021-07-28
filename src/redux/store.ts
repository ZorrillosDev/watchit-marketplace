import { Store } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { routerMiddleware } from 'connected-react-router/immutable'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'
import { History } from 'history'

export default (history: History, initialState = {}): Store => {
  // Array of all middlewares to be applied.
  const middlewares = [
    thunkMiddleware,
    routerMiddleware(history)
  ]

  return configureStore({
    reducer: rootReducer(history),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(...middlewares)
  })
}

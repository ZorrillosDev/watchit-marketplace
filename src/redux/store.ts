import { createStore, applyMiddleware, compose, Store } from 'redux'
import { routerMiddleware } from 'connected-react-router/immutable'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { History } from 'history'

export default (history: History, initialState = {}): Store => {
  // devtools for debugging in dev environment.
  // @ts-expect-error
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?? compose

  // Array of all middlewares to be applied.
  const middlewares = [
    thunk,
    routerMiddleware(history)
  ]

  const enhancers = [
    applyMiddleware(...middlewares)
  ]

  return createStore(
    rootReducer(history),
    initialState,
    composeEnhancers(...enhancers)
  )
}

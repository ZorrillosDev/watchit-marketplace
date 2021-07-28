import {createStore, applyMiddleware, compose, Store} from 'redux'
import {routerMiddleware} from 'connected-react-router/immutable'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import {History} from 'history'
import {fromJS} from 'immutable'

// @ts-ignore
export default (history: History, initialState = {}): Store => {
    // Array of all middlewares to be applied.
    const middlewares = [
        thunk,
        routerMiddleware(history)
    ]

    // devtools for debugging in dev environment.
    // @ts-ignore
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    const enhancers = applyMiddleware(...middlewares)

    return createStore(
        rootReducer(history),
        composeEnhancers(enhancers)
    )
}

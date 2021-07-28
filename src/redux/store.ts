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
    const devTools =
        // eslint-disable-next-line no-undef
        process.env.NODE_ENV !== 'production'
            // @ts-expect-error
            ? window?.__REDUX_DEVTOOLS_EXTENSION__
            : (a: any) => a

    // @ts-ignore
    return createStore(
        rootReducer(history),
        // @ts-expect-error
        fromJS(initialState),
        compose(applyMiddleware(...middlewares), devTools)
    )
}

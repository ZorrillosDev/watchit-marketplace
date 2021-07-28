import {connectRouter} from 'connected-react-router'
import {Reducer, combineReducers} from 'redux'
import {History} from 'history'
import app from './app'

const createRootReducer = (history: History): Reducer => {
    return combineReducers({
        app, router: connectRouter(history)
    })
}
export default createRootReducer

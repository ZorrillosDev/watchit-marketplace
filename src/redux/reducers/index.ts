import { connectRouter } from 'connected-react-router'
import { Reducer, combineReducers } from 'redux'
import { appReducer } from './app'
import { History } from 'history'

const createRootReducer = (history: History): Reducer => {
  return combineReducers({
    app: appReducer,
    router: connectRouter(history)
  })
}
export default createRootReducer

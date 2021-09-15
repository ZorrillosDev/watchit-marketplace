import { connectRouter } from 'connected-react-router'
import { Reducer, combineReducers } from 'redux'
import { History } from 'history'
import AppReducers from '@state/app/reducer'

const createRootReducer = (history: History): Reducer => {
  return combineReducers({
    app: AppReducers,
    router: connectRouter(history)
  })
}

export default createRootReducer

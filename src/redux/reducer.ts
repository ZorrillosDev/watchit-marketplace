import { connectRouter } from 'connected-react-router'
import { Reducer, combineReducers } from 'redux'
import { History } from 'history'
import RecentReducers from '@state/recents/reducer'

const createRootReducer = (history: History): Reducer => {
  return combineReducers({
    recent: RecentReducers,
    router: connectRouter(history)
  })
}

export default createRootReducer

import { History } from 'history'
import { connectRouter } from 'connected-react-router'
import { Reducer, combineReducers } from 'redux'
import WalletReducer from '@state/reducers/WalletReducer'

const createRootReducer = (history: History): Reducer => {
  return combineReducers({
    wallet: WalletReducer,
    router: connectRouter(history)
  })
}
export default createRootReducer

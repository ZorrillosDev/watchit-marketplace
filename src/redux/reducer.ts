import { connectRouter } from 'connected-react-router'
import { Reducer, combineReducers } from 'redux'
import { History } from 'history'
import MoviesReducers from '@state/movies/reducer'
import UsersReducers from '@state/users/reducer'
import Web3Reducers from '@state/web3/reducer'

const createRootReducer = (history: History): Reducer => {
  return combineReducers({
      users: UsersReducers,
      movies: MoviesReducers,
      web3: Web3Reducers,
      router: connectRouter(history)
  })
}

export default createRootReducer

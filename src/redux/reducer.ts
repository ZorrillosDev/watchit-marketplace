import { connectRouter } from 'connected-react-router'
import { Reducer, combineReducers } from 'redux'
import { History } from 'history'
import MoviesReducers from '@state/movies/reducer'
import UsersReducers from '@state/users/reducer'

const createRootReducer = (history: History): Reducer => {
  return combineReducers({
    users: UsersReducers,
    movies: MoviesReducers,
    router: connectRouter(history)
  })
}

export default createRootReducer

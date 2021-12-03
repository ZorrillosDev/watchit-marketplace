import { ThunkAction, ThunkDispatcher } from '@state/types'
import { Movie } from '@state/types/movies'
import { MoviesArgs } from '@state/movies/types'
import { setMovies } from '@state/movies/reducer'
import { API_ENDPOINT } from '@state/CONSTANTS'

export { setMovies, addMovie } from '@state/movies/reducer'

export interface MoviesActions {
  fetchRecentMovies: <P extends MoviesArgs>(args?: P) => void
}

export const fetchRecentMovies = <P extends MoviesArgs>(args?: P): ThunkAction<Promise<void>> => {
  return async (dispatch: ThunkDispatcher) => {
    try {
      fetch(`${API_ENDPOINT}/cache/recent`).then(async (res) => {
        const moviesCollection: Movie[] = await res.json()
        // Set valid result from API
        dispatch(setMovies(moviesCollection))
      }).catch((error) => console.log(error))
    } catch (e) {
      // TODO handle error here
    }
  }
}

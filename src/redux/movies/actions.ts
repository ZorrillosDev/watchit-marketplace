import {ThunkAction, ThunkDispatcher} from '@state/types'
import {Movie, MoviesArgs, MovieArgs} from '@state/movies/types'
import {setMovies} from '@state/movies/reducer'
import fetch, {Endpoints} from './service'

export { setMovies, addMovie } from '@state/movies/reducer'
export const fetchMovieProfile = <P extends MovieArgs>(): ThunkAction<Promise<void>> => {
  return async (dispatch: ThunkDispatcher) => {
    try {
      const moviesCollection: Movie[] = await fetch(Endpoints.profile)
      dispatch(setMovies(moviesCollection))
    } catch (e) {
      // TODO handle error here
    }
  }
}
export const fetchRecentMovies = <P extends MoviesArgs>(): ThunkAction<Promise<void>> => {
  return async (dispatch: ThunkDispatcher) => {
    try {
      const moviesCollection: Movie[] = await fetch(Endpoints.recent)
      dispatch(setMovies(moviesCollection))
    } catch (e) {
      // TODO handle error here
    }
  }
}

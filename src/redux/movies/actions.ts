import { ThunkAction, ThunkDispatcher } from '@state/types'
import { Movie, MoviesArgs, MovieArgs } from '@state/movies/types'
import { setMovies, setMovie } from '@state/movies/reducer'
import fetch, { Endpoints } from './service'

export { setMovies, setMovie, addMovie } from '@state/movies/reducer'
export const fetchMovieProfile = <P extends MovieArgs>(args: P): ThunkAction<Promise<void>> => {
  return async (dispatch: ThunkDispatcher) => {
    try {
      const movie: Movie = await fetch(Endpoints.profile, args)
      dispatch(setMovie(movie))
    } catch (e) {
      // TODO handle error here
    }
  }
}
export const fetchRecentMovies = <P extends MoviesArgs>(args?: P): ThunkAction<Promise<void>> => {
  return async (dispatch: ThunkDispatcher) => {
    try {
      const moviesCollection: Movie[] = await fetch(Endpoints.recent, args)
      dispatch(setMovies(moviesCollection))
    } catch (e) {
      // TODO handle error here
    }
  }
}

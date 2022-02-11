import { ThunkAction, ThunkDispatcher } from '@state/types'
import { Movie, MoviesArgs, MovieArgs } from '@state/movies/types'
import { setMovies, setMovie, setUploadProgress } from '@state/movies/reducer'
import  {fetch} from "@state/service";
import  { Endpoints } from './service'


export { setMovies, setMovie, addMovie, setUploadProgress } from '@state/movies/reducer'
export const fetchMovieProfile = <P extends MovieArgs>(params: P): ThunkAction<Promise<void>> => {
  return async (dispatch: ThunkDispatcher) => {
    try {
      const movie: Movie = await fetch(Endpoints.profile, {params})
      dispatch(setMovie(movie))
    } catch (e) {
      // TODO handle error here
    }
  }
}

export const commitUploadMovie = (): ThunkAction<Promise <void>> =>{
    return async (dispatch: ThunkDispatcher) => {
        try {

        } catch (e) {
            // TODO handle error here
        }
    }
}

export const fetchRecentMovies = <P extends MoviesArgs>(params?: P): ThunkAction<Promise<void>> => {
  return async (dispatch: ThunkDispatcher) => {
    try {
      const moviesCollection: Movie[] = await fetch(Endpoints.recent, {params})
      dispatch(setMovies(moviesCollection))
    } catch (e) {
      // TODO handle error here
    }
  }
}

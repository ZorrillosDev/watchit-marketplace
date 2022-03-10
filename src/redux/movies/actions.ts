import { ThunkAction, ThunkDispatcher } from '@state/types'
import { Movie, MoviesArgs, MovieBidArgs, MovieArgs, MovieBid } from '@state/movies/types'
import { setMovies, setMovie, setUploadProgress, addBidToMovie, setBidsToMovie } from '@state/movies/reducer'
import { request } from '@state/service'
import { Endpoints } from './service'

export { setMovies, setMovie, setBidsToMovie, addMovie, setUploadProgress, addBidToMovie } from '@state/movies/reducer'
export const fetchMovieProfile = <P extends MovieArgs>(params: P): ThunkAction<Promise<void>> => {
  return async (dispatch: ThunkDispatcher) => {
    try {
      const movie: Movie = await request(Endpoints.profile, { params })
      dispatch(setMovie(movie))
    } catch (e) {
      // TODO handle error here
    }
  }
}

export const fetchRecentMovies = <P extends MoviesArgs>(params?: P): ThunkAction<Promise<void>> => {
  return async (dispatch: ThunkDispatcher) => {
    try {
      const moviesCollection: Movie[] = await request(Endpoints.recent, { params })
      dispatch(setMovies(moviesCollection))
    } catch (e) {
      // TODO handle error here
    }
  }
}

export const fetchRecentMovieBids = <P extends MovieArgs>(params: P): ThunkAction<Promise<void>> => {
  return async (dispatch: ThunkDispatcher) => {
    try {
      const moviesBids: MovieBid[] = await request(Endpoints.bid, { params })
      dispatch(setBidsToMovie(moviesBids))
    } catch (e) {
      // TODO handle error here
    }
  }
}

export const commitBidMovie = <P extends MovieBidArgs>(params: P): ThunkAction<Promise<void>> => {
  return async (dispatch: ThunkDispatcher) => {
    try {
      const endpoint = `${Endpoints.bid}?id=${params.id ?? ''}`
      const bid: MovieBid = await request(endpoint, {
        method: 'post',
        data: params
      })

      dispatch(addBidToMovie(bid))
    } catch (e) {
      // TODO handle error here
    }
  }
}

export const commitUploadMovie = <P extends FormData>(params: P): ThunkAction<Promise<void>> => {
  return async (dispatch: ThunkDispatcher) => {
    try {
      await request(Endpoints.create, {
        method: 'post',
        data: params,
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (p: ProgressEvent) => {
          dispatch(setUploadProgress((p.loaded / p.total) * 100))
        }
      })
    } catch (e) {
      // TODO handle error here
    }
  }
}

import { ThunkAction, ThunkDispatcher } from '@state/types'
import { Movie, MoviesArgs, MovieArgs, MoviesSearch } from '@state/movies/types'
import { setMovies, setMovie, setUploadProgress, setSearchResult } from '@state/movies/reducer'
import { Web3SafePurchaseArgs } from '@state/web3/types'
import { callSafePurchase } from '@w3/calls/nft'
import { flushBidsForMovie } from '@state/bids/actions'
import { request } from '@state/service'
import { Endpoints } from './service'

export { setMovies, setMovie, addMovie, setUploadProgress, setSearchResult } from '@state/movies/reducer'


/**
 * Start movie upload
 * @param {FormData} params
 * @returns {Promise}
 */
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

/**
 * Fetch movie profile`
 * @param {MovieArgs} params
 * @returns {Promise}
 */
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

/**
 * Fetch recent movies
 * @param {MovieArgs} params
 * @returns {Promise}
 */
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

/**
 * Call safePurchase contract method and flush old bids
 * @param {MovieArgs & Web3SafePurchaseArgs} params
 * @returns {Promise}
 */
export const safePurchaseMovie = <P extends MovieArgs & Web3SafePurchaseArgs>(params: P): ThunkAction<Promise<void>> => {
  return async (dispatch: ThunkDispatcher) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      await callSafePurchase(params)
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      dispatch(flushBidsForMovie(params))
    } catch (e) {
      // TODO handle error here
    }
  }
}

/**
 * Search for movies 
 * @param {MoviesSearch} params
 * @returns {Promise}
 */
 export const searchMovie = <P extends MoviesSearch>(params: P): ThunkAction<Promise<void>> => {
  return async (dispatch: ThunkDispatcher) => {
    try {

      const moviesCollection: Movie[] = await request(Endpoints.search, { params })
      dispatch(setSearchResult(moviesCollection))
    } catch (e) {
      // TODO handle error here
    }
  }
}

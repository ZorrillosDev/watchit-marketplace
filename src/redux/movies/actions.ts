import { ThunkAction, ThunkDispatcher } from '@state/types'
import { Movie, MoviesArgs, MovieBidArgs, MovieArgs, MovieBid } from '@state/movies/types'
import { setMovies, setMovie, setUploadProgress, addBidToMovie, setBidsToMovie } from '@state/movies/reducer'
import { Web3SafePurchaseArgs } from '@state/web3/types'
import { callSafePurchase } from '@w3/calls/nft'
import { request } from '@state/service'
import { Endpoints } from './service'

export { setMovies, setMovie, setBidsToMovie, addMovie, setUploadProgress, addBidToMovie } from '@state/movies/reducer'

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
 * Fetch recent bids for movie
 * @param {MovieArgs} params 
 * @returns {Promise}
 */
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

/**
 * Add bid for movie
 * @param {MovieBidArgs} params 
 * @returns {Promise}
 */
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

/**
 * Flush all bids for movie
 * @param {MovieArgs} params 
 * @returns {Promise}
 */
export const flushBidsForMovie = <P extends MovieArgs>(params: P): ThunkAction<Promise<void>> => {
  return async (dispatch: ThunkDispatcher) => {
    try {
      await request(Endpoints.bidsFlush, {
        method: 'post',
        data: params
      })

      dispatch(setBidsToMovie([] as MovieBid[]))
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
      await callSafePurchase(params)
      dispatch(flushBidsForMovie(params))
    } catch (e) {
      // TODO handle error here
    }
  }
}

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

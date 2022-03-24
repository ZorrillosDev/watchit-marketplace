import { ThunkAction, ThunkDispatcher } from '@state/types'
import { addBidToMovie, setBidsToMovie } from '@state/bids/reducer'
import { Bid, BidArgs } from '@state/bids/types'
import { MovieArgs } from '@state/movies/types'
import { request } from '@state/service'
import { Endpoints } from './service'

export { setBidsToMovie, addBidToMovie } from '@state/bids/reducer'

/**
 * Fetch recent bids for movie
 * @param {MovieArgs} params
 * @returns {Promise}
 */
export const fetchRecentMovieBids = <P extends MovieArgs>(params: P): ThunkAction<Promise<void>> => {
  return async (dispatch: ThunkDispatcher) => {
    try {
      const moviesBids: Bid[] = await request(Endpoints.bids, { params })
      dispatch(setBidsToMovie(moviesBids))
    } catch (e) {
      // TODO handle error here
    }
  }
}

/**
 * Add bid for movie
 * @param {BidArgs} params
 * @returns {Promise}
 */
export const commitBidMovie = <P extends BidArgs>(params: P): ThunkAction<Promise<void>> => {
  return async (dispatch: ThunkDispatcher) => {
    try {
      const endpoint = `${Endpoints.bids}?id=${params.id ?? ''}`
      const bid: Bid = await request(endpoint, {
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
      await request(Endpoints.flush, {
        method: 'post',
        data: params
      })

      dispatch(setBidsToMovie([] as Bid[]))
    } catch (e) {
      // TODO handle error here
    }
  }
}

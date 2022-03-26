import { ThunkDispatcher, ThunkAction } from '@state/types'
import { fetchRecentMovieBids, commitBidMovie, flushBidsForMovie } from '@state/bids/actions'
import reducer, { initialState, setBidsToMovie, addBidToMovie } from '@state/bids/reducer'
import { Bid } from '@state/bids/types/bids'
import { BidArgs, BidsArgs } from '@state/bids/types'

jest.mock('@state/service')
jest.mock('@w3/calls/nft')

describe('Movies store', () => {
  let movieBid: Bid
  let movieBids: Bid[]
  let dispatch: ThunkDispatcher
  let getState: () => unknown
  let actionForFetchRecentBids: ThunkAction<void>
  let actionForCommitBidMovie: ThunkAction<void>
  let actionForFlushBidsForMovie: ThunkAction<void>
  let bidMovieArgs: BidsArgs
  let bidFlushMovieArgs: BidArgs

  beforeAll(() => {
    // @typescript-eslint/consistent-type-assertions
    movieBids = [{
      id: 'tt00',
      account: '0x0',
      created_at: '00/00/00',
      bid: 10000
    }] as unknown as Bid[]

    movieBid = movieBids[0]
  })

  it('should return tracking initial state', () => {
    expect(
      reducer(undefined, {} as any)
    ).toEqual(initialState)
  })

  it('should handle set for bid collection', () => {
    const current = reducer(initialState, setBidsToMovie(movieBids))
    expect(current).toEqual({ ...initialState, ...{ bidCollection: movieBids } })
    expect(reducer(current, setBidsToMovie(movieBids))).toEqual({
      ...initialState,
      bidCollection: movieBids
    })
  })

  it('should handle add to bid collection', () => {
    const current = reducer(initialState, addBidToMovie(movieBid))
    expect(current).toEqual({ ...initialState, ...{ bidCollection: [movieBid] } })
    expect(reducer(current, addBidToMovie(movieBid))).toEqual({
      ...initialState,
      bidCollection: [movieBid, movieBid]
    })
  })

  describe('thunk', () => {
    beforeEach(() => {
      // initialize new spies
      dispatch = jest.fn()
      getState = jest.fn()
      bidMovieArgs = { bid: 2, account: 'test', id: '1' }
      bidFlushMovieArgs = { id: '1' }

      actionForFetchRecentBids = fetchRecentMovieBids({ id: '1' })
      actionForCommitBidMovie = commitBidMovie(bidMovieArgs)
      actionForFlushBidsForMovie = flushBidsForMovie(bidFlushMovieArgs)
    })
  })
})

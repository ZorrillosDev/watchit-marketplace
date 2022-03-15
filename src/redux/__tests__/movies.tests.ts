import { ThunkDispatcher, ThunkAction } from '@state/types'
import { Movie, MovieBid } from '@state/movies/types/movies'
import { fetchRecentMovies, fetchRecentMovieBids, commitBidMovie, commitUploadMovie, flushBidsForMovie, safePurchaseMovie } from '@state/movies/actions'
import reducer, { addMovie, initialState, setMovies, setMovie, setUploadProgress, setBidsToMovie, addBidToMovie } from '@state/movies/reducer'
import { MovieArgs, MovieBidArgs } from '@state/movies/types'
import { Web3SafePurchaseArgs } from '@state/web3/types'
import { FAKE_MOVIES } from '@src/config'
import { request } from '@state/service'
import { callSafePurchase } from '@src/w3/calls/nft'

jest.mock('@state/service')
jest.mock('@w3/calls/nft')

describe('Movies store', () => {
  let movies: Movie[]
  let movieBid: MovieBid
  let movieBids: MovieBid[]
  let dispatch: ThunkDispatcher
  let getState: () => unknown
  let actionForFetchRecent: ThunkAction<void>
  let actionForFetchRecentBids: ThunkAction<void>
  let actionForCommitBidMovie: ThunkAction<void>
  let actionForCommitUploadMovie: ThunkAction<void>
  let actionForFlushBidsForMovie: ThunkAction<void>
  let actionForSafePurchase: ThunkAction<void>
  let bidMovieArgs: MovieBidArgs
  let bidFlushMovieArgs: MovieArgs
  let purchaseMovieArgs: MovieArgs & Web3SafePurchaseArgs

  beforeAll(() => {
    // @typescript-eslint/consistent-type-assertions
    movies = FAKE_MOVIES as unknown as Movie[]
    movieBids = [{
      id: 'tt00',
      account: '0x0',
      created_at: '00/00/00',
      bid: 10000
    }] as unknown as MovieBid[]

    movieBid = movieBids[0]
  })

  it('should return tracking initial state', () => {
    expect(
      reducer(undefined, {} as any)
    ).toEqual(initialState)
  })

  it('should handle add for movies', () => {
    const current = reducer(initialState, addMovie(movies[0]))

    expect(current).toEqual({ ...initialState, ...{ collection: [movies[0]] } })
    expect(reducer(current, addMovie(movies[0]))).toEqual({
      ...initialState,
      collection: [movies[0], movies[0]]
    })
  })

  it('should handle set movie', () => {
    const current = reducer(initialState, setMovie(movies[0]))

    expect(current).toEqual({ ...initialState, ...{ movie: movies[0] } })
    expect(reducer(current, setMovie(movies[0]))).toEqual({
      ...initialState,
      movie: movies[0]
    })
  })

  it('should handle set for movie collection', () => {
    const current = reducer(initialState, setMovies(movies))

    expect(current).toEqual({ ...initialState, ...{ collection: movies } })
    expect(reducer(current, setMovies(movies))).toEqual({
      ...initialState,
      collection: movies
    })
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

  it('should handle set for upload progress', () => {
    const current = reducer(initialState, setUploadProgress(10))

    expect(current).toEqual({ ...initialState, ...{ progress: 10 } })
    expect(reducer(current, setUploadProgress(15))).toEqual({
      ...initialState,
      progress: 15
    })
  })

  describe('thunk', () => {
    beforeEach(() => {
      // initialize new spies
      dispatch = jest.fn()
      getState = jest.fn()
      bidMovieArgs = { bid: 2, account: 'test', id: '1' }
      bidFlushMovieArgs = { id: '1' }
      purchaseMovieArgs = { id: '1', tokenId: '0x0', value: '1' }

      actionForFetchRecent = fetchRecentMovies()
      actionForFetchRecentBids = fetchRecentMovieBids({ id: '1' })
      actionForSafePurchase = safePurchaseMovie(purchaseMovieArgs)
      actionForCommitBidMovie = commitBidMovie(bidMovieArgs)
      actionForCommitUploadMovie = commitUploadMovie({} as any)
      actionForFlushBidsForMovie = flushBidsForMovie(bidFlushMovieArgs)
    })

    it('should call recent action with valid args ', async () => {
      await actionForFetchRecent(dispatch, getState, undefined)
      expect(request).toHaveBeenCalledWith('/movie/recent', { params: undefined })
    })

    it('should call recent bids action with valid args ', async () => {
      await actionForFetchRecentBids(dispatch, getState, undefined)
      expect(request).toHaveBeenCalledWith('/movie/bid', { params: { id: '1' } })
    })

    it('should call commit bid movie action with valid args ', async () => {
      await actionForCommitBidMovie(dispatch, getState, undefined)
      expect(request).toHaveBeenCalledWith('/movie/bid?id=1', { data: bidMovieArgs, method: 'post' })
    })

    it('should call flush bids for movie action with valid args ', async () => {
      await actionForFlushBidsForMovie(dispatch, getState, undefined)
      expect(request).toHaveBeenCalledWith('/movie/bid/flush', { data: bidFlushMovieArgs, method: 'post' })
    })

    it('should call safe movie purchase action with valid args', async () => {
      await actionForSafePurchase(dispatch, getState, undefined)
      expect(callSafePurchase).toHaveBeenCalledWith(purchaseMovieArgs)
    })

    it('should call commit upload movie action with valid args ', async () => {
      await actionForCommitUploadMovie(dispatch, getState, undefined)
      expect(request).toBeCalled()
    })
  })
})

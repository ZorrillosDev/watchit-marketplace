import { ThunkDispatcher, ThunkAction } from '@state/types'
import { Movie } from '@state/movies/types/movies'
import { FAKE_MOVIES } from '@src/config'
import { request } from '@state/service'
import { MovieBidArgs } from '@state/movies/types'
import { fetchRecentMovies, fetchRecentMovieBids, commitBidMovie, commitUploadMovie } from '@state/movies/actions'
import reducer, { addMovie, initialState, setMovies, setMovie } from '@state/movies/reducer'

jest.mock('@state/service')

describe('Movies store', () => {
  let movies: Movie[]
  let dispatch: ThunkDispatcher
  let getState: () => unknown
  let actionForFetchRecent: ThunkAction<void>
  let actionForFetchRecentBids: ThunkAction<void>
  let actionForCommitBidMovie: ThunkAction<void>
  let actionForCommitUploadMovie: ThunkAction<void>
  let bidMovieArgs: MovieBidArgs

  beforeAll(() => {
    // @typescript-eslint/consistent-type-assertions
    movies = FAKE_MOVIES as unknown as Movie[]
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

  describe('thunk', () => {
    beforeEach(() => {
      // initialize new spies
      dispatch = jest.fn()
      getState = jest.fn()
      bidMovieArgs = { bid: 2, account: 'test', id: '1' }
      actionForFetchRecent = fetchRecentMovies()
      actionForFetchRecentBids = fetchRecentMovieBids({id: '1'})
      actionForCommitBidMovie = commitBidMovie(bidMovieArgs)
      actionForCommitUploadMovie = commitUploadMovie({} as any)
    })

    it('should call recent action with valid args ', async () => {
      await actionForFetchRecent(dispatch, getState, undefined)
      expect(request).toHaveBeenCalledWith('/movie/recent', { params: undefined })
    })

    it('should call recent bids action with valid args ', async () => {
      await actionForFetchRecentBids(dispatch, getState, undefined)
      expect(request).toHaveBeenCalledWith('/movie/bid', {params: {id: 1}})
    })

    it('should call commit bid movie action with valid args ', async () => {
      await actionForCommitBidMovie(dispatch, getState, undefined)
      expect(request).toHaveBeenCalledWith('/movie/bid?id=1', { data: bidMovieArgs, method: 'post' })
    })

    it('should call commit upload movie action with valid args ', async () => {
      await actionForCommitUploadMovie(dispatch, getState, undefined)
      expect(request).toBeCalled()
    })
  })
})

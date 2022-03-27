import { ThunkDispatcher, ThunkAction } from '@state/types'
import { Movie } from '@state/movies/types/movies'
import { fetchRecentMovies, commitUploadMovie, safePurchaseMovie, searchMovie } from '@state/movies/actions'
import reducer, { addMovie, initialState, setMovies, setMovie, setUploadProgress, setSearchResult } from '@state/movies/reducer'
import { MovieArgs, MoviesSearch } from '@state/movies/types'
import { Web3SafePurchaseArgs } from '@state/web3/types'
import { FAKE_MOVIES } from '@src/config'
import { request } from '@state/service'
import { callSafePurchase } from '@src/w3/calls/nft'

jest.mock('@state/service')
jest.mock('@w3/calls/nft')

describe('Movies store', () => {
  let movies: Movie[]
  let dispatch: ThunkDispatcher
  let getState: () => unknown
  let actionForFetchRecent: ThunkAction<void>
  let actionForCommitUploadMovie: ThunkAction<void>
  let actionForSafePurchase: ThunkAction<void>
  let actionForSearchMovie: ThunkAction<void>
  let searchMovieParams: MoviesSearch
  let purchaseMovieArgs: MovieArgs & Web3SafePurchaseArgs

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
    // Initial empty movie state
    const current = reducer(initialState, setMovie({} as any))

    expect(current).toEqual({ ...initialState, ...{ movie: {} as any } })
    expect(reducer(current, setMovie(movies[0]))).toEqual({
      ...initialState,
      movie: movies[0]
    })
  })

  it('should handle set for movie collection', () => {
    // Initial empty movies state
    const current = reducer(initialState, setMovies([] as any[]))

    expect(current).toEqual({ ...initialState, ...{ collection: [] } })
    expect(reducer(current, setMovies(movies))).toEqual({
      ...initialState,
      collection: movies
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

  it('should handle set for search movies', () => {
    // Initial empty search result
    const current = reducer(initialState, setSearchResult([] as any))

    expect(current).toEqual({ ...initialState, ...{ searchResult: []} })
    expect(reducer(current, setSearchResult(movies))).toEqual({
      ...initialState,
      searchResult: movies
    })
  })


  describe('thunk', () => {
    beforeEach(() => {
      // initialize new spies
      dispatch = jest.fn()
      getState = jest.fn()
      searchMovieParams = {term: "Batman"}
      purchaseMovieArgs = { id: '1', tokenId: '0x0', value: '1' }

      actionForFetchRecent = fetchRecentMovies()
      actionForSafePurchase = safePurchaseMovie(purchaseMovieArgs)
      actionForCommitUploadMovie = commitUploadMovie({} as any)
      actionForSearchMovie = searchMovie(searchMovieParams)
    })

    it('should call recent action with valid args ', async () => {
      await actionForFetchRecent(dispatch, getState, undefined)
      expect(request).toHaveBeenCalledWith('/movie/recent', { params: undefined })
    })

    it('should call safe movie purchase action with valid args', async () => {
      await actionForSafePurchase(dispatch, getState, undefined)
      expect(callSafePurchase).toHaveBeenCalledWith(purchaseMovieArgs)
    })

    it('should call search movie action with valid args', async () => {
      await actionForSearchMovie(dispatch, getState, undefined)
      expect(callSafePurchase).toHaveBeenCalledWith(searchMovieParams)
    })

    it('should call commit upload movie action with valid args ', async () => {
      await actionForCommitUploadMovie(dispatch, getState, undefined)
      expect(request).toBeCalled()
    })
  })
})

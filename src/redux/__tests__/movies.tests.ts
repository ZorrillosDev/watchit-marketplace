import reducer, { addMovie, initialState, setMovies, setMovie } from '@state/movies/reducer'
import { ThunkDispatcher, ThunkAction } from '@state/types'
import { Movie } from '@state/movies/types/movies'
import { fetchRecentMovies } from '@state/movies/actions'
import { FAKE_MOVIES } from '@src/config'

// @ts-expect-error
window.fetch = jest.fn(async () =>
  await Promise.resolve({
    json: async () => await Promise.resolve(FAKE_MOVIES[0])
  })
)

describe('Movies store', () => {
  let movies: Movie[]
  let dispatch: ThunkDispatcher
  let getState: () => unknown
  let actionForFetchRecent: ThunkAction<void>

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

    expect(current).toEqual({ ...initialState, ...{ collection: movies[0] } })
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
      actionForFetchRecent = fetchRecentMovies()
    })

    it('should call recent action with valid args ', async () => {
      await actionForFetchRecent(dispatch, getState, undefined)
      expect(fetch).toHaveBeenCalledWith('http://localhost:5000/cache/movie/recent')
    })
  })
})

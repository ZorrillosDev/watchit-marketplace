import reducer, {addMovie, initialState, setMovies} from '@state/recents/reducer'
import {Movie} from '@state/types'
import {fetchRecentMovies} from "@state/recents/actions";
import {ThunkDispatcher, ThunkAction} from "@state/types";
import {FAKE_MOVIES} from '@src/config'

// @ts-ignore
window.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve(FAKE_MOVIES[0]),
    })
);

describe('Recents store', () => {

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

        expect(current).toEqual({...initialState, ...{movies: [movies[0]]}})
        expect(reducer(current, addMovie(movies[0]))).toEqual({
            ...initialState,
            movies: [movies[0], movies[0]]
        })
    })

    it('should handle set for movie collection', () => {
        const current = reducer(initialState, setMovies(movies))

        expect(current).toEqual({...initialState, ...{movies}})
        expect(reducer(current, setMovies(movies))).toEqual({
            ...initialState,
            movies
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
            expect(fetch).toHaveBeenCalledWith('http://localhost:5000/cache/recent')
        })

    })
})

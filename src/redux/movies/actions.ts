import {ThunkAction, ThunkDispatcher} from '@state/types'
import {Movie, MoviesArgs} from '@state/movies/types'
import {setMovies} from '@state/movies/reducer'
import getRecent from './service'

export {setMovies, addMovie} from '@state/movies/reducer'
export const fetchRecentMovies = <P extends MoviesArgs>(args?: P): ThunkAction<Promise<void>> => {
    return async (dispatch: ThunkDispatcher) => {
        try {
            getRecent().then(async (res) => {
                const moviesCollection: Movie[] = await res.json()
                // Set valid result from API
                dispatch(setMovies(moviesCollection))
            })
        } catch (e) {
            // TODO handle error here
        }
    }
}

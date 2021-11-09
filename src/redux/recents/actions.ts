import { Movie, ThunkAction, ThunkDispatcher } from '@state/types'
import { RecentMoviesArgs } from '@state/recents/types'
import { setMovies } from '@state/recents/reducer'
import { API_ENDPOINT } from '@state/CONSTANTS'

export { setMovies, addMovie } from '@state/recents/reducer'

export interface RecentMoviesActions {
  fetchRecentMovies: <P extends RecentMoviesArgs>(args?: P) => void
}

export const fetchRecentMovies = <P extends RecentMoviesArgs>(args?: P): ThunkAction<Promise<void>> => {
  return async (dispatch: ThunkDispatcher) => {
    try {
      fetch(`${API_ENDPOINT}/cache/recent`).then(async (res) => {
        const data = await res.json()
        const recentMovies: Movie[] = data.map((el: { properties: Movie }) => el.properties)
        // Set valid result from API
        dispatch(setMovies(recentMovies))
      }).catch((error) => console.log(error))
    } catch (e) {
      // TODO handle error here
    }
  }
}

import {Movie, ThunkAction, ThunkDispatcher} from "@state/types";
import {RecentMoviesArgs} from "@state/recents/types";
import {setMovies} from "@state/recents/reducer";

export {setMovies, addMovie} from '@state/recents/reducer'

export interface RecentMoviesActions {
    fetchRecentMovies: <P extends RecentMoviesArgs>(args?: P) => void
}

export const fetchRecentMovies = <P extends RecentMoviesArgs>(args?: P): ThunkAction<Promise<void>> => {
    return async (dispatch: ThunkDispatcher) => {
        try {
            fetch("http://localhost:5000/cache/recent").then(async(res)=>{
                const data = await res.json()
                const recentMovies: Movie[] = data.map((el: { properties: Movie }) => el.properties)
                // Set valid result from API
                dispatch(setMovies(recentMovies))
            })

        } catch (e) {
            // TODO handle error here
        }
    }
}
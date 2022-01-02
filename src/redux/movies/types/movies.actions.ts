export interface MovieArgs {
  id?: string
}

export interface MoviesArgs {
  limit?: number
}

export interface MoviesActions {
  fetchRecentMovies: <P extends MoviesArgs>(args?: P) => void
  fetchMovieProfile: <P extends MovieArgs>(args: P) => void
}

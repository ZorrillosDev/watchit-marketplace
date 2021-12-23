export interface MoviesArgs {
  limit?: number
}

export interface MoviesActions {
  fetchRecentMovies: <P extends MoviesArgs>(args?: P) => void
}

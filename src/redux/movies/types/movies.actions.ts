import { Web3SafePurchaseArgs } from '@state/web3/types'

export interface MovieArgs {
  id?: string
}
export interface MoviesArgs {
  limit?: number
}
export interface MoviesSearch {
  term: string
}

export interface MoviesActions {
  commitUploadMovie: <P extends FormData>(params: P) => void
  fetchRecentMovies: <P extends MoviesArgs>(args?: P) => void
  fetchMovieProfile: <P extends MovieArgs>(args: P) => void
  safePurchaseMovie: <P extends MovieArgs & Web3SafePurchaseArgs>(args: P) => void
  searchMovie: <P extends MoviesSearch>(params: P) => void

}

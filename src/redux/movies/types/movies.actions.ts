import { Web3SafePurchaseArgs } from '@state/web3/types'

export interface MovieArgs {
  id?: string
}

export interface MovieBidArgs extends MovieArgs {
  account: string
  bid: number
}

export interface MoviesArgs {
  limit?: number
}

export interface MoviesActions {
  fetchRecentMovies: <P extends MoviesArgs>(args?: P) => void
  fetchMovieProfile: <P extends MovieArgs>(args: P) => void
  fetchRecentMovieBids: <P extends MovieArgs>(args: P) => void
  commitUploadMovie: <P extends FormData>(args: P) => void
  commitBidMovie: <P extends MovieBidArgs>(args: P) => void
  flushBidsForMovie: <P extends MovieArgs>(args: P) => void
  safePurchaseMovie: <P extends MovieArgs & Web3SafePurchaseArgs>(args: P) => void

}

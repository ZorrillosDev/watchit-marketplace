import { MovieArgs } from "@src/redux/movies/types"

export interface BidArgs extends MovieArgs {
  account: string
  bid: number
}


export interface BidActions {
  commitBidMovie: <P extends BidArgs>(args: P) => void
  fetchRecentMovieBids: <P extends MovieArgs>(args: P) => void
  flushBidsForMovie: <P extends MovieArgs>(args: P) => void
}

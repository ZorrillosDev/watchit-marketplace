import { Movie, MovieBid } from './movies'

export interface MoviesState {
  movie: Movie
  collection: Movie[]
  bidCollection: MovieBid[]
  progress: number
}

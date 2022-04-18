import { Movie } from './movies';

export interface MoviesState {
  movie: Movie
  searchResult: Movie[]
  collection: Movie[]
  progress: number
}

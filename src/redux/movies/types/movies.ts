export const GenresList = [
  'All',
  'Action',
  'Adventure',
  'Animation',
  'Biography',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Family',
  'Fantasy',
  'Film-Noir',
  'History',
  'Horror',
  'Music',
  'Musical',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Sport',
  'Thriller',
  'War',
  'Western',
  'News',
  'Reality-TV',
  'Talk-Show',
  'Game-Show'
] as const

export type Genres = typeof GenresList[number]

export interface Images {
  small: string
  medium: string
  large: string
}

export interface MovieBid {
  id: string
  account: string
  created_at: string
  bid: number
}

export interface Movie {
  creator: string
  description: string
  path: string
  title: string
  date_uploaded_unix: number
  price: number
  group_name: string
  imdb_code: string
  language: string
  mpa_rating: string
  rating: number
  runtime: number
  synopsis: string
  trailer_code: string
  year: number
  genres: Genres
  posters: Images
}

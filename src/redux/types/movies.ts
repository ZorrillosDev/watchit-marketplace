
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

export interface MovieProperties {
  date_uploaded_unix: number
  genres: Genres
  group_name: string
  imdb_code: string
  language: string
  mpa_rating: string
  rating: number
  runtime: number
  synopsis: string
  title: string
  trailer_code: string
  year: number
}

export interface Movie {
  creator: string
  description: string
  image: string
  name: string
  properties: MovieProperties
}

import { ThunkAction as AsyncThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { RootState } from '@state/store'

export type ThunkAction<R> = AsyncThunkAction<R, RootState, any, AnyAction>
export type ThunkDispatcher = ThunkDispatch<RootState, any, AnyAction>

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

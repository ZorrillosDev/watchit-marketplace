// TRANSFER MODAL IMPORTS
import React, { FC } from 'react'

// PROJECT IMPORTS
import SearchView from '@components/Search/SearchView'
import { Movie } from '@state/movies/types'

// ===========================|| SEARCH - CONTAINER ||=========================== //

/* eslint-disable  @typescript-eslint/strict-boolean-expressions */

export const SearchContainer: FC = (): JSX.Element => {
  const [searchMovies, setSearchMovies] = React.useState<Movie[]>([])
  const [searching, setSearching] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  const handleClose = (): void => {
    setOpen(false)
  }

  const handleCancel = (): void => {
    setOpen(false)
    setSearching(false)
    setSearchMovies([])
  }

  const onSearch = (text: string): void => {
    if (!text) return setOpen(false)

    setSearching(true)
    setOpen(true)

    // TODO add movies here
    setTimeout(() => {
      setSearching(false)
      setSearchMovies([])
    }, 1000)
  }

  return (
    <SearchView
      {...{
        open,
        handleClose,
        onSearch,
        searching,
        handleCancel
      }} movies={searchMovies}
    />
  )
}

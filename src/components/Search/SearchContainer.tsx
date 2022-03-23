// TRANSFER MODAL IMPORTS
import React, { FC } from 'react'

// PROJECT IMPORTS
import SearchView from '@components/Search/SearchView'
import { Movie } from "@state/movies/types";

// ===========================|| SEARCH - CONTAINER ||=========================== //

/* eslint-disable  @typescript-eslint/strict-boolean-expressions */

export const SearchContainer: FC = (): JSX.Element => {
  const [searchMovies, setSearchMovies] = React.useState<Movie[]>([])
  const [searching, setSearching] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  const handleOpen = (): void => {
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  const onSearch = (text: string): void => {
    console.log("hello")
    console.log(text)
    setOpen(true)
  }

  return (
    <SearchView {...{ open, handleClose, onSearch }} movies={searchMovies} />
  )
}

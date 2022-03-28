// TRANSFER MODAL IMPORTS
import React, { FC, useCallback } from 'react'

// PROJECT IMPORTS
import SearchView from '@components/Search/SearchView'
import { MoviesActions, MoviesState } from '@state/movies/types'
import { searchMovie } from '@state/movies/actions'
import { connect, RootStateOrAny } from 'react-redux'
import { selectSearchResult } from '@src/redux/movies/selector'

// ===========================|| SEARCH - CONTAINER ||=========================== //

/* eslint-disable  @typescript-eslint/strict-boolean-expressions */
const SearchContainer: FC<MoviesActions & MoviesState> = (props): JSX.Element => {
  const { searchMovie, searchResult } = props
  const [searching, setSearching] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  // Debounce timeout to avoid search overhead
  let debounce: ReturnType<typeof setTimeout> | null = null

  const handleClose = useCallback((): void =>
    setOpen(false), [open]
  )

  const handleCancel = useCallback((): void => {
    setOpen(false)
    setSearching(false)
  }, [searching, open])

  const onSearch = useCallback((term: string): void => {
    if (!term) return setOpen(false)

    // Add debounce here
    setSearching(true)
    setOpen(true)

    // Debounce/Avoid overhed on search
    if (debounce) clearTimeout(debounce)
    debounce = setTimeout(() => {
      searchMovie({ term })
    }, 500)

    setTimeout(() => {
      setSearching(false)
    }, 1000)
  }, [])

  return (
    <SearchView
      {...{
        open,
        handleClose,
        onSearch,
        searching,
        handleCancel
      }} movies={searchResult}
    />
  )
}

const mapDispatchToProps: Partial<MoviesActions> = { searchMovie }
const mapStateToProps = (state: RootStateOrAny): Partial<MoviesState> => {
  const searchResult = selectSearchResult(state)
  return { searchResult }
}

export const Search = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchContainer)

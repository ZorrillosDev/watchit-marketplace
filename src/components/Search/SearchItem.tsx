// REACT IMPORTS
import React, { FC } from 'react'

// MUI IMPORTS
import { Box, BoxProps, styled } from '@mui/material'

// PROJECT IMPORTS
import { Color } from '@src/utils'
import { Movie } from "@state/movies/types";

// ===========================|| NOTIFICATIONS - ITEM ||=========================== //

const SearchItem: FC<{ movie: Movie }> = ({ movie }): JSX.Element => {
  return (
    <SearchItemWrapper>

    </SearchItemWrapper>
  )
}

const SearchItemWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  cursor: 'pointer',
  padding: '16px',
  '&:hover': {
    background: Color.addAlpha(theme.palette.primary.light, 0.3)
  },
  '&:last-of-type': {
    borderBottomRightRadius: theme.shape.borderRadius,
    borderBottomLeftRadius: theme.shape.borderRadius
  }
}))

export default SearchItem

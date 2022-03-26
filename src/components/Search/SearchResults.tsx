// REACT IMPORTS
import React, { FC } from 'react'

// MUI IMPORTS
import {
  CardContent, Grid, Paper, Popper, Typography,
  styled, GridProps, CircularProgress
} from '@mui/material'

// THIRD PARTY IMPORTS
import { VirtualElement } from '@popperjs/core'

// PROJECT IMPORTS
import Transitions from '@components/Transitions'
import { MainCard } from '@components/Cards'
import scroller from '@styles/scroller'
import { Movie } from '@state/movies/types'
import { SxProps, Theme } from '@mui/system'
import SearchItem from '@components/Search/SearchItem'

/* eslint-disable  @typescript-eslint/strict-boolean-expressions */

// ===========================|| SEARCH - VIEW ||=========================== //

export interface SearchResultsProps {
  movies: Movie[]
  open: boolean
  searching: boolean
  anchorRef: VirtualElement | null
}

const SearchResults: FC<SearchResultsProps> = (props): JSX.Element => {
  return (
    <Popper
      placement='bottom-start'
      open={props.open}
      anchorEl={props?.anchorRef}
      role={undefined}
      transition
      id='search_results'
      disablePortal
      popperOptions={{
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 5]
            }
          }
        ]
      }}
    >
      {({ TransitionProps }) => (
        <Transitions in={props.open} {...TransitionProps}>
          <Paper>
            <MainCard border={false} elevation={16} content={false} sx={SearchCardSx}>
              <CardContent
                sx={{
                  p: '16px 0 16px 10px !important',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >

                {
                  props.searching && <CircularProgress size={30} />
                }

                {
                  !props.searching
                    ? props.movies.length
                      ? (
                        <Grid container direction='column' spacing={1} sx={{ pl: 1 }}>
                          <SearchContent item xs={12}>
                            <Grid container direction='column' spacing={1}>
                              {
                                props.movies.map((movie, i) => <SearchItem movie={movie} key={i} />)
                              }
                            </Grid>
                          </SearchContent>
                        </Grid>
                        )
                      : (
                        <Typography textAlign='center' width={1}>
                          No items found
                        </Typography>
                        )
                    : <></>
                }
              </CardContent>
            </MainCard>
          </Paper>
        </Transitions>
      )}
    </Popper>
  )
}

const SearchCardSx: SxProps<Theme> = {
  borderRadius: '10px',
  boxShadow: 'rgba(0,0,0,0.16) 0px 4px 16px',
  '&:hover': {
    boxShadow: 'rgba(0,0,0,0.16) 0px 4px 16px'
  }
}

const SearchContent = styled(Grid)<GridProps>(({ theme }) => ({
  height: 1,
  maxHeight: 'calc(100vh - 205px)',
  overflowX: 'hidden',
  padding: '0px !important',
  ...scroller(theme)
}))

export default SearchResults

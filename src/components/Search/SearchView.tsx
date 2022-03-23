// REACT IMPORTS
import React, { FC } from 'react'

// MUI IMPORTS
import {
  Box, ClickAwayListener, CardContent, Grid, Paper,
  Popper, Typography, styled, GridProps, InputBase,
  InputBaseProps, CircularProgress, BoxProps
} from '@mui/material'

// PROJECT IMPORTS
import Transitions from '@components/Transitions'
import { MainCard } from '@components/Cards'
import i18n from '@src/i18n'
import scroller from '@styles/scroller'
import { Movie } from '@state/movies/types'
import { Search as SearchIcon } from '@mui/icons-material'
import { SxProps, Theme } from '@mui/system'
import SearchItem from '@components/Search/SearchItem'
import { IconX } from '@tabler/icons'

/* eslint-disable  @typescript-eslint/strict-boolean-expressions */

// ===========================|| SEARCH - VIEW ||=========================== //

export interface SearchViewProps {
  movies: Movie[]
  open: boolean
  searching: boolean
  handleClose: () => void
  handleCancel: () => void
  onSearch: (txt: string) => void
}

const SearchView: FC<SearchViewProps> = (props): JSX.Element => {
  const anchorRef = React.useRef(null)
  const [text, setText] = React.useState('')

  const handleChange = (e: any): void => {
    setText(e.target.value)
    props.onSearch(e.target.value)
  }

  const handleCancel = (): void => {
    setText('')
    props.handleCancel()
  }

  return (
    <>
      <ClickAwayListener onClickAway={props.handleClose}>
        {/* Search Input */}
        <SearchWrapper ref={anchorRef}>
          <SearchInputWrapper container>
            <SearchIconWrapper filled={!!text}>
              <SearchIcon />
            </SearchIconWrapper>
            <SearchInput
              placeholder={i18n.t('GLOBAL_SEARCH')}
              value={text}
              onFocus={() => props.onSearch(text)}
              onChange={handleChange}
            />
            {
              text
                ? (
                  <SearchCancel onClick={handleCancel}>
                    <IconX />
                  </SearchCancel>
                  )
                : <></>
            }
          </SearchInputWrapper>
          <Popper
            placement='bottom-start'
            open={props.open}
            anchorEl={anchorRef.current}
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
                        props.searching &&
                          <CircularProgress size={30} />
                      }
                      {
                        (!props.searching && props.movies.length)
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
                          : <></>
                      }
                      {
                        (!props.searching && !props.movies.length)
                          ? (
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
        </SearchWrapper>
      </ClickAwayListener>
    </>
  )
}

const SearchWrapper = styled(Grid)<GridProps>(() => ({
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  zIndex: 1000,
  '#search_results': {
    top: 'calc(100% + 2px) !important',
    left: '0 !important',
    width: '100%',
    transform: 'none !important',
    zIndex: 1010
  },
  '@media (max-width: 600px)': {
    width: 'auto',
    marginLeft: '1rem',
    marginRight: '0.5rem',
    flexGrow: 1,
    maxWidth: 'calc(100% - 7rem)'
  },
  '@media (min-width: 600px)': {
    width: '25%',
    marginRight: 0,
    flexGrow: 1
  },
  '@media (min-width: 960px)': {
    width: '30%',
    marginLeft: '2rem'
  }
}))

const SearchInputWrapper = styled(Grid)<GridProps>(() => ({
  borderRadius: '10px',
  flexWrap: 'nowrap',
  alignItems: 'center',
  justifyContent: 'flex-start',
  border: '1px solid rgb(229, 232, 235)',
  height: '2.5rem',
  width: '100%',
  zIndex: 1005
}))

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

const SearchIconWrapper = styled(Box)<BoxProps & { filled: boolean }>(({ theme, filled }) => ({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '2.5rem',
  height: '2.5rem',
  '& svg': {
    fill: filled ? theme.palette.primary.main : theme.palette.grey[400]
  }
}))

const SearchCancel = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'absolute',
  cursor: 'pointer',
  right: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '2.5rem',
  height: '2.5rem',
  '& svg': {
    fill: theme.palette.primary.main,
    color: theme.palette.primary.main,
    width: '1.2rem',
    height: '1.2rem'
  }
}))

const SearchInput = styled(InputBase)<InputBaseProps>(({ theme }) => ({
  marginTop: '2px',
  padding: 0,
  height: '100%',
  width: '100%',
  color: theme.palette.primary.main,
  '& input': {
    height: '100%',
    width: '100%',
    padding: '0 2.5rem 0 2.5rem !important',
    fontWeight: 'bold',
    color: theme.palette.primary.main
  }
}))

export default SearchView

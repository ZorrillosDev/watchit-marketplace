// REACT IMPORTS
import React, { FC } from 'react'

// MUI IMPORTS
import {
  Box, ButtonBase, ClickAwayListener, CardContent,
  Divider, Grid, Paper, Popper, Stack, Typography,
  useMediaQuery, useTheme, styled, GridProps, Badge, IconButton, InputBase, IconButtonProps, InputBaseProps
} from '@mui/material'

// PROJECT IMPORTS
import Transitions from '@components/Transitions'
import { MainCard } from '@components/Cards'
import i18n, { Translation } from '@src/i18n'
import scroller from '@styles/scroller'
import { Movie } from "@state/movies/types";
import {Search as SearchIcon} from "@mui/icons-material";

/* eslint-disable  @typescript-eslint/strict-boolean-expressions */

// ===========================|| SEARCH - VIEW ||=========================== //

export interface SearchViewProps {
  movies: Movie[]
  open: boolean
  handleClose: () => void
  onSearch: (txt: string) => void
}

const SearchView: FC<SearchViewProps> = (props): JSX.Element => {
  const theme = useTheme()
  const matchesXs = useMediaQuery(theme.breakpoints.down('sm'))
  const anchorRef = React.useRef(null)

  return (
    <>
      <ClickAwayListener onClickAway={props.handleClose}>
        {/*Search Input*/}
        <SearchWrapper ref={anchorRef} container>
          <SearchButton type='button' aria-label='search'>
            <SearchIcon />
          </SearchButton>
          <SearchInput  placeholder={i18n.t('GLOBAL_SEARCH')}
                        onKeyUp={(e: any) => props.onSearch(e.target.value)}
          />
          <Popper
            placement={'bottom-start'}
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
                  <MainCard border={false} elevation={16} content={false} sx={{ boxShadow: 'rgba(0,0,0,0.16) 0px 4px 16px' }} >
                    <CardContent sx={{ p: '0px !important' }}>
                      <Grid container direction='column' spacing={1} sx={{ pl: 1, pb: 1 }}>
                        <SearchContent item xs={12}>
                          <Grid container direction='column' spacing={1}>
                            <Grid item xs={12} p={0}>
                              <Divider sx={{ mt: 0, mb: 0 }} />
                            </Grid>
                            <Grid item xs={12}>
                              Hello world haha
                            </Grid>
                          </Grid>
                        </SearchContent>
                      </Grid>
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

const SearchWrapper = styled(Grid)<GridProps>(({ theme }) => ({
  borderRadius: '1rem',
  flexShrink: 0,
  flexWrap: 'nowrap',
  alignItems: 'center',
  justifyContent: 'flex-start',
  border: `1px solid ${theme.palette.divider}`,
  height: '2.5rem',
  '.': {
    top: 'calc(100% + 2px)',
    left: 0,
    transform: 'none !important'
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
    marginLeft: '2rem',
  }
}))

const SearchContent = styled(Grid)<GridProps>(({ theme }) => ({
  height: 1,
  maxHeight: 'calc(100vh - 205px)',
  overflowX: 'hidden',
  ...scroller(theme)
}))

const SearchButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  padding: 0,
  width: '2.5rem',
  height: '2.5rem',
  '& svg': {
    fill: theme.palette.grey[400]
  }
}))

const SearchInput = styled(InputBase)<InputBaseProps>(({ theme }) => ({
  marginTop: '2px',
  padding: 0,
  height: '100%',
  width: '100%',
  color: theme.palette.text.secondary,
  '& input': {
    height: '100%',
    width: '100%',
    padding: 0,
    fontWeight: 'bold'
  }
}))

export default SearchView

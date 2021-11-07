// REACT IMPORTS
import React, { FC } from 'react'

// MUI IMPORTS
import { Grid, Typography, Container, Button, styled, GridProps, useMediaQuery } from '@mui/material'

// PROJECT IMPORTS
// TODO delete this when data comes from backend
import { FAKE_MOVIES } from '@src/config'
import { KeyboardArrowDown } from '@mui/icons-material'
import Poster from '@components/Poster'
import { useTheme } from '@mui/material/styles'

// ===========================|| HOME - TRENDING ||=========================== //

const HomeTrending: FC = (): JSX.Element => {
  const theme = useTheme()
  const moviesRows = 5
  let moviesColumns = 2
  moviesColumns = useMediaQuery(theme.breakpoints.up('md')) ? 3 : moviesColumns
  moviesColumns = useMediaQuery(theme.breakpoints.up('lg')) ? 4 : moviesColumns
  moviesColumns = useMediaQuery(theme.breakpoints.up('xl')) ? 5 : moviesColumns

  return (
    <Container>
      <Grid container alignItems='center' justifyContent='center' spacing={6}>
        <Grid item xs={12}>
          <Typography variant='h2' color='text.primary' fontWeight={600}>
            Movies in Trending
          </Typography>
        </Grid>
        <Grid item xs={12} display='flex' alignItems='center' justifyContent='center'>
          <Grid container spacing={3}>
            {
              FAKE_MOVIES.map((poster, i) => {
                const moviesMax = moviesColumns * moviesRows
                return (i < moviesMax)
                  ? (
                    <HomeTrendingPosterWrapper item key={poster.title}>
                      <Poster {...poster} showDetails />
                    </HomeTrendingPosterWrapper>
                  )
                  : <React.Fragment key={poster.title} />
              })
            }
          </Grid>
        </Grid>
        <Grid item xs={12} display='flex' alignItems='center' justifyContent='center'>
          <Button
            variant='text' color='primary' size='large'
            sx={{ svg: { width: '1.5rem', height: '1.5rem', ml: 1, color: 'text.primary' } }}
          >
            <Typography variant='h3' color='text.primary' textAlign='center' fontWeight={400}>
              See all
            </Typography>
            <KeyboardArrowDown />
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default HomeTrending

export const HomeTrendingPosterWrapper = styled(Grid)<GridProps>(({ theme }) => ({
  width: '100%',
  height: '25rem',
  [theme.breakpoints.up('xs')]: {
    maxWidth: '100%'
  },
  [theme.breakpoints.up('sm')]: {
    maxWidth: 'calc(100% / 2)'
  },
  [theme.breakpoints.up('md')]: {
    maxWidth: 'calc(100% / 3)'
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 'calc(100% / 4)'
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 'calc(100% / 5)'
  }
}))

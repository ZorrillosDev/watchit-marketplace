// REACT IMPORTS
import React, { FC } from 'react'

// MUI IMPORTS
import { Grid, Typography, Container, Button, useMediaQuery } from '@mui/material'

// PROJECT IMPORTS
// TODO delete this when data comes from backend
import { FAKE_MOVIES } from '@src/config'
import { FilterList } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import HomeRecentPoster from '@pages/Home/components/HomeRecentPoster'

// ===========================|| HOME - RECENT ||=========================== //

const HomeRecent: FC = (): JSX.Element => {
  const theme = useTheme()
  const moviesRows = 2
  let moviesColumns = 2
  moviesColumns = useMediaQuery(theme.breakpoints.up('md')) ? 3 : moviesColumns
  moviesColumns = useMediaQuery(theme.breakpoints.up('lg')) ? 4 : moviesColumns
  moviesColumns = useMediaQuery(theme.breakpoints.up('xl')) ? 5 : moviesColumns

  return (
    <Container>
      <Grid container alignItems='center' justifyContent='center' spacing={6}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant='h2' color='text.primary' fontWeight={600}>
                Recent Movies
              </Typography>
            </Grid>
            <Grid item xs={6} display='flex' alignItems='center' justifyContent='flex-end'>
              <Button variant='outlined' color='primary' startIcon={<FilterList />} sx={{ borderRadius: '3rem !important' }}>
                Filter
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} display='flex' alignItems='center' justifyContent='center'>
          <Grid container spacing={3}>
            {
              FAKE_MOVIES.map((poster, i) => {
                const moviesMax = moviesColumns * moviesRows
                return (i < moviesMax)
                  ? <HomeRecentPoster {...poster} key={poster.title} />
                  : <React.Fragment key={poster.title} />
              })
            }
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default HomeRecent

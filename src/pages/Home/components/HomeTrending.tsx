// REACT IMPORTS
import React, { FC } from 'react'

// MUI IMPORTS
import { Grid, Typography, Container } from '@mui/material'

// PROJECT IMPORTS
import Poster from '@components/Poster'
// TODO delete this when data comes from backend
import { FAKE_MOVIES } from "@src/config";


// ===========================|| HOME - TRENDING ||=========================== //

const HomeTrending: FC = (): JSX.Element => {
  return (
    <Container>
      <Grid container alignItems='center' justifyContent='space-between' spacing={6}>
        <Grid item xs={12} md={10} lg={6}>
          <Typography
            variant='h3'
            color='primary.dark'
          >
            NTF MOVIES IN TRENDING
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {
              FAKE_MOVIES.map((poster) => {
                return (
                  <Grid item xs={12} sm={4} md={3} lg={2} xl={1} key={poster.title}>
                    <Poster {...poster} />
                  </Grid>
                )
              })
            }
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default HomeTrending

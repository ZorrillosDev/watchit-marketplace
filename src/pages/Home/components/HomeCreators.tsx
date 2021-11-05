// REACT IMPORTS
import React, { FC } from 'react'

// MUI IMPORTS
import { Grid, Typography, Container } from '@mui/material'

// PROJECT IMPORTS
import Creator from '@components/Creator'

// TODO delete this when data comes from backend
import { FAKE_CREATORS } from "@src/config";

// ===========================|| HOME - CREATORS ||=========================== //

const HomeCreators: FC = (): JSX.Element => {
  return (
    <Container>
      <Grid spacing={6} container alignItems='center' justifyContent='space-between'>
        <Grid item xs={12} md={10} lg={6}>
          <Typography
            color='primary.dark'
            variant='h3'
          >
            FEATURED CREATORS
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {
              FAKE_CREATORS.map((creator) => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={creator.username}>
                    <Creator {...creator} />
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

export default HomeCreators

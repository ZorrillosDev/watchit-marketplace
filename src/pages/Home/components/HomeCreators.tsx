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
      <Grid spacing={6} container alignItems='center' justifyContent='center'>
        <Grid item xs={12} md={10} lg={6}>
          <Typography variant='h2' color='primary.dark' textAlign='center' fontWeight={400}>
            Featured Creators
          </Typography>
        </Grid>
        <Grid item xs={12} xl={10}>
          <Grid container spacing={3}>
            {
              FAKE_CREATORS.map((creator) => {
                return (
                  <Grid item xs={12} sm={6} lg={3} key={creator.username}>
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

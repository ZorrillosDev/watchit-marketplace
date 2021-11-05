// REACT IMPORTS
import React, { FC } from 'react'

// MUI IMPORTS
import { Grid, Typography, Container } from '@mui/material'
import Creator from '@components/Creator'
import Poster from "@components/Poster";

// ===========================|| HOME - TRENDING ||=========================== //

const HomeCreators: FC = (): JSX.Element => {
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
              fakeCreators.map((creator) => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
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

// TODO delete this when data comes from backend
const fakeCreators = [
  {
    name: 'Diana Sinclair',
    username: '@dianaesinclair',
    profileUrl: 'https://mui.com/static/images/avatar/1.jpg',
    coverUrl: 'string',
    biography: 'Diana Sinclair is a 17-year-old internationally awarded visual artist, activist, and curator. Their artwork Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
    followers: 30,
    isFollowing: true
  },
]

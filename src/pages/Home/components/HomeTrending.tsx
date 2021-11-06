// REACT IMPORTS
import React, { FC } from 'react'

// MUI IMPORTS
import {Grid, Typography, Container, Box, Button} from '@mui/material'

// PROJECT IMPORTS
import Poster from '@components/Poster'
// TODO delete this when data comes from backend
import { FAKE_MOVIES } from "@src/config";
import {KeyboardArrowDown} from "@mui/icons-material";


// ===========================|| HOME - TRENDING ||=========================== //

const HomeTrending: FC = (): JSX.Element => {
  return (
    <Container>
      <Grid container alignItems='center' justifyContent='center' spacing={6}>
        <Grid item xs={12} md={10} lg={6}>
          <Typography variant='h2' color='secondary' textAlign='center' fontWeight={400}>
            Movies in Trending
          </Typography>
        </Grid>
        <Grid item xs={12} md={10} lg={8} display='flex' alignItems='center' justifyContent='center'>
          <Grid container spacing={6}>
            <Grid item xs={6} sm={4} md={4} lg={4}>
              <Poster {...FAKE_MOVIES[1]} showDetails={true} />
            </Grid>
            <Grid item xs={6} sm={4} md={4} lg={4}>
              <Poster {...FAKE_MOVIES[2]} showDetails={true} />
            </Grid>
            <Grid item xs={6} sm={4} md={4} lg={4} sx={{ display: { xs: 'none', lg: 'block' } }}>
              <Poster {...FAKE_MOVIES[3]} showDetails={true} />
            </Grid>
            {/*<Grid item xs={6} sm={4} md={4} lg={3} sx={{ display: { xs: 'block', sm: 'none', lg: 'block' } }}>*/}
            {/*  <Poster {...FAKE_MOVIES[4]} showDetails={true} />*/}
            {/*</Grid>*/}
            {/*{*/}
            {/*  FAKE_MOVIES.map((poster) => {*/}
            {/*    return (*/}
            {/*      <Grid item xs={12} sm={4} md={3} lg={2} xl={1} key={poster.title}>*/}
            {/*        <Poster {...poster} />*/}
            {/*      </Grid>*/}
            {/*    )*/}
            {/*  })*/}
            {/*}*/}
          </Grid>
        </Grid>
        <Grid item xs={12} md={10} lg={6} display='flex' alignItems='center' justifyContent='center'>
          <Button
            variant='text' color='secondary' size='large'
            sx={{ 'svg': { width: '1.5rem', height: '1.5rem', ml: 1, color: 'secondary' } }}
          >
            <Typography variant='h3' color='secondary' textAlign='center' fontWeight={400}>
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

// REACT IMPORTS
import React, { FC } from 'react'

// MUI IMPORTS
import {Grid, Typography, Container, Button} from '@mui/material'

// PROJECT IMPORTS
// TODO delete this when data comes from backend
import { FAKE_MOVIES } from "@src/config";
import {KeyboardArrowDown} from "@mui/icons-material";
import HomeTrendingCard from "@pages/Home/components/HomeTrendingCard";


// ===========================|| HOME - TRENDING ||=========================== //

const HomeTrending: FC = (): JSX.Element => {
  return (
    <Container>
      <Grid container alignItems='center' justifyContent='center' spacing={6}>
        <Grid item xs={12}>
          <Typography variant='h2' color='secondary' textAlign='center' fontWeight={600}>
            Movies in Trending
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={10} xl={7} display='flex' alignItems='center' justifyContent='center'>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <HomeTrendingCard {...FAKE_MOVIES[1]} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <HomeTrendingCard {...FAKE_MOVIES[2]} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4} sx={{ display: { xs: 'none', md: 'block' } }}>
              <HomeTrendingCard {...FAKE_MOVIES[3]} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} display='flex' alignItems='center' justifyContent='center'>
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
